<template>
  <div class="table" id="createForm">
    <div class="wrapCell cell">

      <div class="contWrap">
        <div class="titleBox">
          <p><img src="../../assets/logo.png" alt="NOVA Wallet" style="width:120px;"/></p>
          <h1>
            <span>{{ language_msg.account }}</span>
            <span>{{ language_msg.create }}</span>
          </h1>
          <h2 class="sub">Create Account</h2>
          <p class="btmIcon"><img src="../../assets/icon-create-account.png" style="width:230px"/></p>
        </div>

        <!-- PC Ver. -->
        <!-- Step1. 계정명 -->
        <div class="contentBox table pcVer step1">
          <div class="cell step1">
            <v-form ref="nameForm" v-model="valid" lazy-validation>
              <div class="inputBox" id="accountName">
                <v-text-field
                  v-model="userAccnt"
                  :rules="accountRules"
                  name="userAccnt"
                  :label="language_msg.account_name"
                  :hint="language_msg.name_valid_hint"
                  persistent-hint
                  required
                  @focus="keyDownEvt"
                ></v-text-field>
                <input type="button" value="" class="resetBtn" id="accntReset" @click="allClear"/>
                <p class="chkErr" v-if="errState">{{errMsg}}</p>
              </div>
              <div class="btnCont abs">
                <input type="button"
                  :disabled="!valid"
                  class="btn sm one"
                  v-bind:class="[ valid ?  'grdt' : 'default' ]"
                  @click="nextStep"
                  :value="language_msg.next_btn"
                />
              </div>
            </v-form>
          </div>
        </div>
        <!-- //Step1. 계정명 -->
        <!-- Step2. 키입력 -->
        <div id="pcStep2" class="contentBox table pcVer step2">
          <div class="cell step2">
            <button @click="beforeStep"><img src="../../assets/back.png" style="width:20px;"/></button>
            <v-form ref="accntForm" v-model="valid2" lazy-validation class="mgTop20">
              <div class="inputBox defaultBox">
                <v-text-field
                  v-model="userAccnt"
                  :rules="accountRules"
                  :label="language_msg.account_name"
                  :hint="language_msg.name_valid_hint"
                  persistent-hint
                  disabled
                ></v-text-field>
              </div>
              <div class="inputBox">
                <v-text-field
                  v-model="ownerKey"
                  :rules="ownerKeyRules"
                  label="Owner Public Key"
                  :hint="language_msg.ownerKey_valid_hint"
                  persistent-hint
                  v-on:keyup="keyMonitor"
                  required
                ></v-text-field>
                <input type="button" value="" class="resetBtn" id="ownerReset" @click="allClear"/>
              </div>
              <div class="inputBox">
                <v-text-field
                  v-model="activeKey"
                  :rules="activeKeyRules"
                  label="Active Public Key"
                  :hint="language_msg.activeKey_valid_hint"
                  persistent-hint
                  required
                ></v-text-field>
                <input type="button" value="" class="resetBtn" id="activeReset" @click="allClear"/>
              </div>
              <div class="btnCont abs">
                  <a href="javascript:void(0);" class="btn md wht two" @click="generate">{{ language_msg.key_generate_btn }}</a>
                <input type="button"
                       :disabled="!valid2"
                       class="btn md"
                       v-bind:class="[ valid2 ?  'grdt' : 'default' ]"
                       :value ="language_msg.create_btn"
                       @click="accntCreate"
                />
              </div>
            </v-form>
          </div>
        </div>
        <!-- //Step2. 키입력 -->
        <!-- //PC Ver. -->
        <!-- Mobile Ver. -->
        <div class="contentBox table mbVer">
          <!-- Step1. 계정명 -->
          <div class="cell">
            <v-form ref="mAccntForm"v-model="valid3" lazy-validation>
              <div class="inputBox" id="mAccountName">
                <v-text-field
                  v-model="userAccnt"
                  :rules="accountRules"
                  :hint="language_msg.name_valid_hint"
                  persistent-hint
                  :label="language_msg.account_name"
                  @focus="accntEvt()"
                  required
                ></v-text-field>
                <input type="button" value="" class="resetBtn" id="mAccntReset" @click="allClear"/>
                <p class="mChkErr" v-if="errState">{{errMsg}}</p>
              </div>
              <div id="mbStep2" class="step2 con">
                <!-- mobile key form component -->
                <div v-if="mAccntValid">
                  <div class="inputBox">
                    <v-text-field
                      v-model="mOwnerKey"
                      :rules="ownerKeyRules"
                      :label="language_msg.ownerKey"
                      :hint="language_msg.ownerKey_valid_hint"
                      persistent-hint
                      @keyup.native="mKeyMonitor"
                      required
                    ></v-text-field>
                    <input type="button" value="" class="resetBtn" id="mOwnerReset" @click="allClear"/>
                  </div>
                  <div class="inputBox">
                    <v-text-field
                      v-model="mActiveKey"
                      :rules="activeKeyRules"
                      :label="language_msg.activeKey"
                      :hint="language_msg.activeKey_valid_hint"
                      persistent-hint
                      required
                    ></v-text-field>
                    <input type="button" value="" class="resetBtn" id="mActiveReset" @click="allClear"/>
                  </div>
                </div>
              </div>
              <div class="btnCont abs">
                <div id="mbStep1Btn" class="stop1">
                  <input type="button"
                    :disabled="!valid3"
                    class="btn sm one"
                    v-bind:class="[ valid3 ?  'grdt' : 'default' ]"
                    :value ="language_msg.next_btn"
                    @click="mbNextStep"
                  />
                </div>
                <div id="mbStep2Btn" class="step2 btns">
                  <a href="javascript:void(0);" class="btn md wht two" @click="generate">{{ language_msg.key_generate_btn }}</a>
                  <input type="button"
                         :disabled="!valid3"
                         class="btn md two"
                         v-bind:class="[ valid3 ?  'grdt' : 'default' ]"
                         :value ="language_msg.create_btn"
                         @click="mAccntCreate"
                  />
                </div>
              </div>
            </v-form>
          </div>
        </div>
        <!-- //Mobile Ver. -->
      </div>

    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    const Eos = require('eosjs');

    import { langMsg } from '../../translations/language';

    export default {
      name: "Account_create",
      data(){
        return{
          param : '',
          valid : null,
          valid2 : null,
          valid3 : null,
          v : false,
          userAccnt : '',
          accountRules : [
            v => !!v || this.language_msg.name_valid_msg01,
            v => v.length === 12 || this.language_msg.name_valid_msg01,
            v => /([a-z1-5]{12}$)/.test(v) || this.language_msg.name_valid_msg01
          ],
          ownerKey : '',
          activeKey : '',
          mOwnerKey : '',
          mActiveKey : '',
          ownerKeyRules : [
            v => !!v || this.language_msg.ownerKey_valid_hint,
            v => /EOS([a-zA-Z1-9]{50}$)/.test(v) || this.language_msg.ownerKey_valid_msg01
          ],
          activeKeyRules : [
            v => !!v || this.language_msg.activeKey_valid_hint,
            v => /EOS([a-zA-Z1-9]{50}$)/.test(v) || this.language_msg.activeKey_valid_msg01
          ],
          userEmail : '',
          userId : '',
          mAccntValid : false,
          errState : false,
          errMsg : '',
          langMsg,
          language : 'en',
          language_msg : [],
        }
      },
      created(){
        this.language = this.$route.query.l;
        console.log('first language !!',this.language);
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

        this.userEmail = escape(this.$route.query.userEmail);
        this.userId = this.$route.query.userId;
      },
      mounted() {
        this.valid = false;
        this.valid2 = false;
        this.valid3 = false;
      },
      methods : {
        allClear(e){
          let me = (e.target).getAttribute('id');
          if( me === 'accntReset' ) this.userAccnt = '';
          else if( me === 'mAccntReset' ) this.userAccnt = '';
          else if( me === 'ownerReset' ) this.ownerKey = '';
          else if( me === 'activeReset' ) this.activeKey = '';
          else if( me === 'mOwnerReset' ) this.mOwnerKey = '';
          else this.mActiveKey = '';
        },
        generate(){
          let url = 'https://generate.eosnova.io/?l='+this.language;
          window.open(url, "_blank");
        },
        keyMonitor(){
          if( this.activeKey.length < 1 ) this.valid2 = false;
        },
        mKeyMonitor(){
          if( this.mActiveKey.length < 1 ) this.valid3 = false;
        },
        beforeStep(){
          const pcStep2_con = document.getElementById('pcStep2');
          pcStep2_con.style.right = '-100%';
          this.ownerKey = '';
          this.activeKey = '';
        },
        nextStep(){
          let len = this.userAccnt.length;
          if( len > 1 ){
            const config = {
              expireInSeconds: 60,
              broadcast: true,
              verbose: false,
              debug: false,
              sign: true,
              httpEndpoint: 'https://mainnet.eoscannon.io',
              chainId: null,
              forceActionDataHex: true,
            };
            const eos = Eos(config);

            eos.getAccount( this.userAccnt )
              .then(result => {
                // console.log('getAccount!!', result);
                this.valid = false;
                this.errState = true;
                this.errMsg = '이미 등록된 계정입니다.';
                let con = document.getElementById('accountName');
                let child = con.children[0];
                child.classList.add('v-input--has-state');
                child.classList.add('error--text');
                this.v = true;
              })
              .catch(err => {
                console.log('등록 계정 없음', err);
                const pcStep2_con = document.getElementById('pcStep2');
                pcStep2_con.style.right = '0';
              });
            this.valid2 = false;
          }
        },
        mbNextStep(){
          let len = this.userAccnt.length;
          if( len > 1 ){
            const config = {
              expireInSeconds: 60,
              broadcast: true,
              verbose: false,
              debug: false,
              sign: true,
              httpEndpoint: 'https://api1.eosdublin.io',
              chainId: null,
              forceActionDataHex: true,
            };
            const eos = Eos(config);

            eos.getAccount( this.userAccnt )
              .then(result => {
                this.errState = true;
                this.errMsg = '이미 등록된 계정입니다.';
                // console.log('getAccount!!!!!!!!', result);
                let con = document.getElementById('mAccountName');
                let child = con.children[0];
                child.classList.add('v-input--has-state');
                child.classList.add('error--text');
                this.v = true;
                this.valid3 = false;
              })
              .catch(err => {
                console.log('getAccount err!!',err);
                this.mAccntValid = true;
                const mbStep2_con = document.getElementById('mbStep2'),
                      mbStep1_btn = document.getElementById('mbStep1Btn'),
                      mbStep2_btn = document.getElementById('mbStep2Btn');
                mbStep2_con.classList.add('active');
                mbStep1_btn.style.display = "none";
                mbStep2_btn.style.display = "block";
                this.valid3 = false;
              });
            this.valid2 = false;
          }
        },
        accntEvt(){
          this.errState = false;
          if( this.v ) {
            this.valid3 = true;
            this.v = false;
          }
          const mbStep2_con = document.getElementById('mbStep2'),
                mbStep1_btn = document.getElementById('mbStep1Btn'),
                mbStep2_btn = document.getElementById('mbStep2Btn');
          mbStep2_con.classList.remove('active');
          setTimeout(()=>{
            this.mAccntValid = false;
            this.ownerKey = '';
            this.activeKey = '';
            mbStep1_btn.style.display = "block";
            mbStep2_btn.style.display = "none";
          }, 200);
        },
        accntCreate(){
          if (this.$refs.accntForm.validate()) {
            const URL = 'https://api.eosnova.io/account/request';

            let data = new URLSearchParams();
            data.append('email', this.userEmail);
            data.append('id', this.userId);
            data.append('account_name', this.userAccnt);
            data.append('owner', this.ownerKey);
            data.append('active', this.activeKey);
            data.append('l', this.language);

            axios.post( URL, data,
              { headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }})
              .then( res => {
                this.$router.push({ name:'Account_requestInfo', query: { rst: true , state: 'complete', l : this.language } });
              })
              .catch( err => {
                let errMsg = err.response.data.msg;
                if( errMsg === 'limit over' ) {
                  this.$router.push({ name:'Account_requestInfo', query: { rst: true , state: 'limit_over', l : this.language } });
                }
                else this.$router.push({ name:'Account_requestInfo', query: { rst: true , state: 'expire', l : this.language } });
                console.log('account create error...!!', errMsg);
              });
          }
        },
        mAccntCreate(){
          if (this.$refs.mAccntForm.validate()) {
            const URL = 'https://api.eosnova.io/account/request';

            let data = new URLSearchParams();
            data.append('email', this.userEmail);
            data.append('id', this.userId);
            data.append('account_name', this.userAccnt);
            data.append('owner', this.mOwnerKey);
            data.append('active', this.mActiveKey);
            data.append('l', this.language);

            axios.post( URL, data,
              { headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }})
              .then( res => {
                this.$router.push({ name:'Account_requestInfo', query: { rst: true , state: 'complete', l : this.language } });
              })
              .catch( err => {
                let errMsg = err.response.data.msg;
                if( errMsg === 'limit over' ) {
                  this.$router.push({ name:'Account_requestInfo', query: { rst: true , state: 'limit_over', l : this.language } });
                }
                else this.$router.push({ name:'Account_requestInfo', query: { rst: true , state: 'expire', l : this.language } });
                console.log('account create error...!!', errMsg);
              });
          }
        },
        keyDownEvt(){
          this.errState = false;
          if( this.v ) {
            this.valid = true;
            this.v = false;
          }
        }
      }
    }
</script>

<style scoped>
</style>
