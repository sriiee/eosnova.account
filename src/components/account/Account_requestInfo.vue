<template>
  <div class="table">
    <div class="wrapCell cell">

      <!-- Expire -->
      <div class="contWrap" id="expire" v-show="state === 'expire'">
        <div class="titleBox center">
          <p><img src="../../assets/logo.png" alt="NOVA Wallet" style="width:120px;"/></p>
          <h1>
            <span>{{language_msg.account}}</span>
            <span>{{language_msg.create_error}}</span>
          </h1>
          <h2 class="sub">Create Account Error</h2>
          <p class="btmIcon"><img src="../../assets/icon-account-error.png" style="width:230px"/></p>
        </div>
        <div class="contentBox table center">
          <div class="cell">
            <div class="rqInfo">
              <p class="topIcon"><img src="../../assets/x.png" style="width:48px;"/></p>
              <h2>{{language_msg.create_error_tit}}</h2>
              <p class="comment">
                {{language_msg.create_error_msg01}}<br/>
                {{language_msg.create_error_msg02}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- //Expire -->
      <!-- Complete -->
      <div class="contWrap" id="complete" v-show="state === 'complete'">
        <div class="titleBox center">
          <p><img src="../../assets/logo.png" alt="NOVA Wallet" style="width:120px;"/></p>
          <h1>
            <span>{{language_msg.account}}</span>
            <span>{{language_msg.create_success}}</span>
          </h1>
          <h2 class="sub">Create Account Success</h2>
          <p class="btmIcon"><img src="../../assets/icon-account-success.png" style="width:230px"/></p>
        </div>
        <div class="contentBox table center">
          <div class="cell">
            <div class="rqInfo">
              <p class="topIcon"><img src="../../assets/check.png" style="width:48px;"/></p>
              <h2>{{language_msg.create_success_tit}}</h2>
              <p class="comment">
                {{language_msg.create_success_msg01}}<br/>
                {{language_msg.create_success_msg02}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- //Complete -->
      <!-- Limit over -->
      <div class="contWrap" id="limitOver" v-show="state === 'limit_over'">
        <div class="titleBox center">
          <p><img src="../../assets/logo.png" alt="NOVA Wallet" style="width:120px;"/></p>
          <h1>
            <span>{{language_msg.account}}</span>
            <span>{{language_msg.create_error}}</span>
          </h1>
          <h2 class="sub">Create Account Error</h2>
          <p class="btmIcon"><img src="../../assets/icon-account-error.png" style="width:230px"/></p>
        </div>
        <div class="contentBox table center">
          <div class="cell">
            <div class="rqInfo">
              <p class="topIcon"><img src="../../assets/x.png" style="width:48px;"/></p>
              <h2>{{language_msg.create_error_tit02}}</h2>
              <p class="comment">
                {{language_msg.create_error_msg05}}<br/>
                {{language_msg.create_error_msg06}}
              </p>
              <p class="btnCont">
                <button class="btn w100 wht" @click="telegramLink">
                  <img src="../../assets/telegram.png" style="width:24px; margin-right:20px;"/>
                  <span style="vertical-align:middle;">{{language_msg.create_error_btn}}</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- //Limit over -->

      <!-- check_info free -->
      <div class="contWrap" id="wait_event" v-show="state === 'check_info_free'">
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
              </div>
            </div>
            <div class="infoBox keyInfo mgTop70">
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
          </div>
          </div>
        </div>
      <!-- //check_info free -->
      <!-- check_info -->
      <div class="contWrap" id="wait" v-show="state === 'check_info'">
        <div class="titleBox">
          <p><img src="../../assets/logo.png" alt="NOVA Wallet" style="width:120px;"/></p>
          <h1>
            <span>{{language_msg.information_check}}</span>
          </h1>
          <h2 class="sub">Check Information</h2>
          <p class="btmIcon"><img src="../../assets/icon-info.png" style="width:230px"/></p>
        </div>
        <div class="contentBox table pdSet">
          <div class="cell">
            <div class="rqInfo scroll">
              <p class="comment colorWht">
                {{language_msg.deposit_msg01}}<br/>
                {{language_msg.deposit_msg02}}
              </p>
              <p class="comment sm mgTop20">
                {{language_msg.deposit_msg03}}
                <span>{{language_msg.deposit_msg04}}</span>{{language_msg.deposit_msg05}}
              </p>
              <div class="deposit_info">
                <div class="top">
                  <div>
                    <span class="tit">{{language_msg.deposit_account}} : </span>
                    <span class="inblock">{{info.receive_account}}</span>
                    <span class="inblock label" v-if="stateTime_st === 'ok'">
                      {{createState}}
                    </span>
                    <span class="inblock label" v-else :title="`${stateTime}`">
                      {{createState}}
                    </span>
                  </div>
                  <div>
                    <span class="tit">{{language_msg.deposit_memo}} : </span>
                    <span class="inblock">{{info.id}}</span>
                  </div>
                  <div>
                    <div v-if="language === 'ko'">
                      <span class="tit">{{language_msg.deposit_date}} : </span>
                      <span class="inblock" v-if="!dpsExpire">
                        {{ko_time}}
                      </span>
                      <strong class="inblock colorPk" v-else>
                        {{ko_time}}
                      </strong>
                    </div>
                    <div v-else>
                      <span class="tit">{{language_msg.deposit_date}} : </span>
                      <span class="inblock" v-if="!dpsExpire">
                        {{en_time}}
                      </span>
                      <strong class="inblock colorPk" v-else>
                        {{en_time}}
                      </strong>
                    </div>
                  </div>
                  <div>
                    <span class="tit">{{language_msg.deposit_count}} : </span>
                    <strong class="inblock colorPp">{{info.total_fee}} EOS</strong>
                  </div>
                </div>
                <div class="btm">
                  <ul>
                    <li class="table">
                      <p class="cell tit">CPU Stake : </p>
                      <p class="cell con">{{info.cpu_staking}} EOS</p>
                    </li>
                    <li class="table">
                      <p class="cell tit">Network Stake : </p>
                      <p class="cell con">{{info.net_staking}} EOS</p>
                    </li>
                    <li class="table">
                      <p class="cell tit">RAM : </p>
                      <p class="cell con">{{info.ram_bytes}} bytes -> {{info.ram}} EOS</p>
                    </li>
                    <li class="table">
                      <p class="cell tit">Fee : </p>
                      <p class="cell con">{{info.fee}} EOS</p>
                    </li>
                    <li class="table total">
                      <p class="cell tit">Total :</p>
                      <p class="cell con">{{info.total_fee}} EOS</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="notiCont">
                <h3>{{language_msg.deposit_chk_tit}}</h3>
                <ul>
                  <li>
                    <span>①</span> {{language_msg.deposit_chk_msg01}}
                  </li>
                  <li>
                    <span>②</span> {{language_msg.deposit_chk_msg02}}
                  </li>
                  <li>
                    <span>③</span> {{language_msg.deposit_chk_msg03}}
                  </li>
                  <li>
                    <span>④</span> {{language_msg.deposit_chk_msg04}}
                  </li>
                  <li>
                    <span>⑤</span> {{language_msg.deposit_chk_msg05}}
                  </li>
                  <li>
                    <span>⑥</span> {{language_msg.deposit_chk_msg06}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- //check_info -->
      <!-- Expire 유료 -->
      <div class="contWrap" id="expire_deposit" v-show="state === 'expire_deposit'">
        <div class="titleBox center">
          <p><img src="../../assets/logo.png" alt="NOVA Wallet" style="width:120px;"/></p>
          <h1>
            <span>{{language_msg.account}}</span>
            <span>{{language_msg.create_error}}</span>
          </h1>
          <h2 class="sub">Create Account Error</h2>
          <p class="btmIcon"><img src="../../assets/icon-account-error.png" style="width:230px"/></p>
        </div>
        <div class="contentBox table center">
          <div class="cell">
            <div class="rqInfo">
              <p class="topIcon"><img src="../../assets/x.png" style="width:48px;"/></p>
              <h2>{{language_msg.create_error_tit}}</h2>
              <p class="comment">
                {{language_msg.create_error_msg03}}<br/>
                {{language_msg.create_error_msg04}}
              </p>
              <p class="btnCont">
                <button class="btn w100 wht" @click="contactLink">{{language_msg.question}}</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- //Expire 유료 -->

    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import { langMsg } from '../../translations/language';

    export default {
        name: "Account_requestInfo",
        data(){
          return{
            rst : '',
            state : '',
            userEmail : '',
            userId : '',
            info : [],
            show : true,
            userAccnt : '',
            ownerKey : '',
            activeKey : '',
            ownerPass : '',
            activePass : '',
            ownerKayVal : '',
            activeKeyVal : '',
            langMsg,
            language : '',
            language_msg : [],
            c : null,
            dpsExpire : true,
            en_time : [],
            ko_time : [],
            createState : '',
            stateTime : null,
            stateTime_st : null,
            tt : null,
          }
        },
        created(){
          // --------------- 언어설정 ---------------
          this.language = this.$route.query.l;
          console.log('request_info language', this.language);
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

          // --------------- 정보확인 ---------------
          this.rst = this.$route.query.rst;
          if( this.rst == null || this.rst.length < 0 || this.rst === 'undefined' ) this.rst = false;
          this.state = this.$route.query.state;

          this.userEmail = escape(this.$route.query.email);
          this.userId = this.$route.query.id;
          this.c = this.$route.query.c;
          const URL = 'https://api.eosnova.io/account/request_info';

          // 정보확인
          if( !this.rst ){
            axios.get( URL+`?id=${this.userId}&email=${this.userEmail}&c=${this.c}&l=${this.language}`)
              .then( res => {
                // 계정생성요청 완료
                Object.assign(this.info, res.data);

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
                if(!this.c || this.c === 'false'){
                  this.state = 'check_info_free';
                  this.userAccnt = this.info.account_name;
                  this.ownerKey = this.info.owner_key;
                  this.activeKey = this.info.active_key;
                  this.keySave();
                }
                else{
                  // 정보확인 - 유료
                  this.state = 'check_info';

                  let bf_date = new Date(this.info.expire_time*1000);
                  this.en_time = bf_date.toString().replace("GMT+0900 (한국 표준시)","");
                  this.ko_time = bf_date.toLocaleString('ko-KR');

                  // 입금기한
                  if( this.info.expire_time > this.info.complete_time ){
                    this.dpsExpire = false;
                  }
                  else this.dpsExpire = true;
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
          contactLink(){
            let url = 'https://docs.google.com/forms/d/e/1FAIpQLSemPBod5aiE-1IEVLypoPQNtmGjE6A2bmsmmRYeqjUjULl0qA/viewform';
            window.open(url, "_blank");
          },
          telegramLink(){
            let url = 'http://bit.ly/2L6fRxu';
            if( this.language === 'ko' ) url = 'http://bit.ly/2urL6Zo';
            window.open(url, "_blank");
          }
        }
    }
</script>
