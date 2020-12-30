<template>
  <div class="table">
    <div class="wrapCell cell">

      <div class="contWrap" id="redeem">
        <div class="titleBox">
          <p><img src="../../assets/logo.png" alt="NOVA Wallet" style="width:120px;"/></p>
          <h1>
            <span>{{language_msg.information_check}}</span>
          </h1>
          <h2 class="sub">Check Information</h2>
          <p class="btmIcon"><img src="../../assets/icon-info.png" style="width:230px"/></p>
        </div>
        <div class="contentBox table">
          <div class="cell">
            <div class="infoBox keyInfo">
              <p class="subTit">
                {{language_msg.information_name}}
              </p>
              <div>
                <h3 class="inblock">{{userAccnt}}</h3>
                <p class="label" :title="`${stateTime}`">
                  {{createState}}
                </p>
                <!--
                <p class="label">
                  {{createState}}
                </p>
                -->
              </div>
            </div>
            <div class="infoBox keyInfo mgTop30">
              <p class="subTit">
                Key {{language_msg.information}}
                <button @click="keyHide">
                  <v-icon v-if="!show">visibility_off</v-icon>
                  <v-icon v-else>visibility</v-icon>
                </button>
              </p>
              <div>
                <h3>Owner Public Key</h3>
                <p class="keyValue" id="ownerKey">
                  {{ownerKey}}
                </p>
              </div>
              <div>
                <h3>Active Public Key</h3>
                <p class="keyValue" id="activeKey">
                  {{activeKey}}
                </p>
              </div>
            </div>
            <v-form ref="redeemForm" v-model="valid" lazy-validation v-if="redeemOn">
              <div class="inputBox mgTop30" id="rdInputBox">
                <v-text-field
                  v-model="userCode"
                  name="userRedeem"
                  :label="language_msg.redeem_label"
                  persistent-hint
                  required
                  :rules="redeemRules"
                  v-on:keyup="keyMonitor"
                ></v-text-field>
                <p id="rdErrMsg"></p>
              </div>
              <div class="btnCont">
                <input
                  type="button"
                  :disabled="!valid"
                  class="btn xsm"
                  v-bind:class="[ valid ?  'grdt' : 'default' ]"
                  :value="language_msg.ok"
                  @click="redeemChk"
                />
              </div>
            </v-form>
          </div>
        </div>
      </div>

      <!-- dialog - 실패 -->
      <v-dialog
        v-model="dialog"
        width="320"
      >
        <v-card>
          <v-card-text>
            <p class="diaImg" style="margin-top:15px;"><img src="../../assets/ok.png" style="width:48px"/></p>
            <p style="margin:20px 0 15px; font-size:18px;">{{language_msg.redeem_ok}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              {{language_msg.ok}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- //dialog - 메일발송완료 -->

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { langMsg } from '../../translations/language';

  export default {
    name: "Account_reqRedeem",
    data() {
      return {
        langMsg,
        language : '',
        language_msg : [],
        info : [],
        rst : '',
        userId : '',
        userEmail : '',
        c : null,
        createState : '',
        stateTime : null,
        stateTime_st : null,
        state : '',
        userAccnt : '',
        show : true,
        redeemValue : '',
        userCode : '',
        ownerKey : '',
        activeKey : '',
        ownerPass : '',
        activePass : '',
        ownerKayVal : '',
        activeKeyVal : '',
        dialog : false,
        redeemRules : [
          v => !!v || this.language_msg.name_valid_msg01,
        ],
        valid : null,
        v : false,
        redeemOn : false,
      }
    },
    created(){
      // --------------- 언어설정 ---------------
      this.language = this.$route.query.l;
      // params 값 확인
      if( this.language === 'ko' ){
        Object.assign(this.language_msg, langMsg.ko);
      }
      else if( this.language == null || this.language.length < 0 || this.language === 'undefined' ){ // param 값 없을 때
        this.language = navigator.language || navigator.userLanguage; // 브라우저 언어 확인
        if( this.language === 'ko' || this.language === 'ko-KR' ) Object.assign(this.language_msg, langMsg.ko);
        else Object.assign(this.language_msg, langMsg.en);
      }
      else{
        Object.assign(this.language_msg, langMsg.en);
      } // 기본언어 설정 : 영어

      this.userEmail = escape(this.$route.query.email);
      this.userId = this.$route.query.id;
      this.c = this.$route.query.c;
      // 정보확인
      if( !this.rst ){
        const URL = 'https://api.eosnova.io/account/request_info';
        axios.get( URL+`?id=${this.userId}&email=${this.userEmail}&c=${this.c}&l=${this.language}`)
          .then( res => {
            // 계정생성요청 완료
            Object.assign(this.info, res.data);
            // console.log('ㅁㄴㅇㄹ',this.info);

            // 상태체크
            let complete = this.info.complete,
              completeErr = this.info.error,
              completeTime = this.info.complete_time;
            if( completeTime !== null ){
              let st_date = new Date(completeTime*1000);
              if( this.language === 'ko' ) this.stateTime = st_date.toLocaleString('ko-KR');
              else this.stateTime = st_date.toString().replace("GMT+0900 (한국 표준시)","");
            }
            else {
              this.stateTime_st = 'ok';
            }

            // 요청 상태
            if( complete && !completeErr ) {
              if( this.language === 'ko' ) this.createState = '생성완료';
              else this.createState = 'Completed';
            }
            else if( !complete && !completeErr ) {
              if( this.language === 'ko' ) this.createState = '요청완료';
              else this.createState = 'On request';
            }
            else {
              if( this.language === 'ko' ) this.createState = '생성실패';
              else this.createState = 'Failed';
            }

            // 무료&유료 체크
            if( this.c ){
              // 정보확인 - 유료
              this.state = 'check_info_free';
              this.userAccnt = this.info.account_name;
              this.ownerKey = this.info.owner_key;
              this.activeKey = this.info.active_key;
              // console.log(this.ownerKey, this.activeKey);
              this.keySave();
            }

            // 리딤 체크
            if( this.info.hasOwnProperty('code') && this.info.hasOwnProperty('redeem')) {
              if( this.info.redeem ) {
                  this.redeemOn = false;
                  if( this.language === 'ko' ) this.createState = '리딤코드 입력 완료';
                  else this.createState = 'Redeemed';
              }

            } else {
              if( !complete && !completeErr) {
                this.redeemOn = true;
              }
            }
          })
          .catch( err => {
            // 임시 에러페이지
            this.state = 'expire';
            this.rst = true;
            console.log('account request info error...!!', err);
          });
      }
    },
    mounted() {
      this.valid = false;
    },
    methods:{
      keySave(){
        this.ownerKayVal = this.ownerKey;
        this.activeKeyVal = this.activeKey;
        for( let i=0; i<this.ownerKayVal.length; i++) this.ownerPass += '●';
        for( let i=0; i<this.activeKeyVal.length; i++) this.activePass += '●';
        this.keyHide();
      },
      keyHide(){
        if( this.show ){
          this.ownerKey = this.ownerPass;
          this.activeKey = this.activePass;
          this.show = false;
        }
        else {
          this.ownerKey = this.ownerKayVal;
          this.activeKey = this.activeKeyVal;
          this.show = true;
        }
      },
      keyMonitor(){
        if( this.v ){
          this.valid = true;
          let errBox = document.getElementById('rdErrMsg');
          errBox.innerText = '';
          this.v = false;
        }
      },
      redeemChk(){
        // 리딤코드 체크
        const URL_REDEEM = 'https://api.eosnova.io/account/redeem_request';
        let data = new URLSearchParams();
        data.append('id', this.userId);
        data.append('email', this.userEmail);
        data.append('code', this.userCode);

        axios.post( URL_REDEEM, data)
          .then( res => {
            console.log('redeem ok', res);
            this.dialog = true;
            this.redeemOn = false;
            if( this.language === 'ko' ) this.createState = '리딤코드 입력 완료';
            else this.createState = 'Redeemed';
          })
          .catch( err => {
            console.log('redeem err', err);
            let errMsg = err.response.data.msg,
                con = document.getElementById('rdInputBox'),
                errBox = document.getElementById('rdErrMsg'),
                child = con.children[0];
            child.classList.add('v-input--has-state');
            child.classList.add('error--text');
            this.v = true;
            this.valid = false;

            if( errMsg === 'used' ){
              if( this.language === 'ko' ) errBox.innerText = '이미 사용한 코드입니다.';
              else errBox.innerText = 'Code is already in use.';
            }
            else{
              if( this.language === 'ko' ) errBox.innerText ='유효하지 않은 코드입니다.';
              else errBox.innerText ='Invalid Code';
            }
          });
      }
    }
  }
</script>

<style scoped>
  .infoBox h3 {
    margin:15px 0 5px;
    font-size:20px;
  }
  #rdErrMsg {
    color:#de42a1;
    margin-top:-10px;
    height:21px;
  }
  .inputBox .v-text-field__details{
    margin-top:10px;
  }
  .infoBox .keyValue {
    height:auto;
  }
  @media (max-width: 1024px){
    .titleBox {
      position:relative;
    }
    .contentBox {
      padding:25px 25px 120px;
    }
  }
</style>
