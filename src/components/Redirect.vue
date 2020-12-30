<template>
  <div class="table">
    <div class="cell">
      <!-- Redirect -->
      <div id="redirect" class="verifyCont" v-if="!err">
        <p class="topIcon"></p>
        <v-progress-circular
          :size="40"
          :width="4"
          indeterminate
        ></v-progress-circular>
        <h1>{{language_msg.redirect_tit}}</h1>
        <p class="ment">
          {{language_msg.redirect_msg01}}<br/>
          {{language_msg.redirect_msg02}} <a href="#;">{{language_msg.redirect_here}}</a>{{language_msg.redirect_msg03}}
        </p>
      </div>
      <!-- //Redirect -->
      <!-- Time Out -->
      <div id="timeOut" class="verifyCont" v-if="err">
        <p class="topIcon"></p>
        <p class="mdIcon"><img src="../assets/timeout_x.png" style="width:40px;"/></p>
        <div v-if="err_title === 'expire'">
          <h1>{{language_msg.timeOut_tit}}</h1>
          <p class="ment">
            {{language_msg.timeOut_msg01}}<br/>
            {{language_msg.timeOut_msg02}}
          </p>
        </div>
        <div v-else-if="err_title === 'noRequest'">
          <h1>{{language_msg.no_request_tit}}</h1>
          <p class="ment">
            {{language_msg.no_request_msg01}}<br/>
            {{language_msg.no_request_msg02}}
          </p>
        </div>
        <div v-else-if="err_title === 'complete'">
          <h1>{{language_msg.no_request_tit}}</h1>
          <p class="ment">
            {{language_msg.already_complete_msg01}}
          </p>
        </div>
        <div v-else-if="err_title === 'event_false'">
          <h1>{{language_msg.timeOut_msg03}}</h1>
          <p class="ment">
            {{language_msg.timeOut_msg04}}<br/>
            {{language_msg.timeOut_msg05}}
          </p>
        </div>
      </div>
      <!-- //Time Out -->
    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    import { langMsg } from '../translations/language';

    export default {
        name: "Redirect",
        data() {
          return {
            userEmail : '',
            userId : '',
            langMsg,
            language : 'en',
            language_msg : [],
            err : false,
            err_title : '',
          }
        },
      created(){
        // --------------- 언어설정 ---------------
        this.language = this.$route.query.l;
        // params 값 확인
        if( this.language === 'ko' ){
          Object.assign(this.language_msg, langMsg.ko);
        }
        else if( this.language == null || this.language.length < 0 || this.language === 'undefined' ){
          this.language = navigator.language || navigator.userLanguage; // 브라우저 언어 확인
          if( this.language === 'ko' || this.language === 'ko-KR' ) Object.assign(this.language_msg, langMsg.ko);
          else Object.assign(this.language_msg, langMsg.en);
        }
        else{
          Object.assign(this.language_msg, langMsg.en);
        } // 기본언어 설정 : 영어

        // --------------- Email Verify ---------------
        this.userEmail = escape(this.$route.query.email);
        this.userId = this.$route.query.id;

        if( this.userEmail == null || this.userId == null ){
          // let url = 'http://eosnova.io';
          document.location.href = 'http://eosnova.io';
        }
        else{
          const event_URL = 'https://s3.ap-northeast-2.amazonaws.com/novaconfig/config.json';
          axios.get( event_URL )
            .then( res => {
              let info = [];
              Object.assign(info, res.data);
              let event_dft = info.account_create_event.default;
              console.log( 'account_create_event default : ', event_dft);
              if( !event_dft || event_dft === 'false' ) {
                this.err = true;
                this.err_title = 'event_false';
              }
              else{
                document.location.href = "eosnova://email/verify?id=" + this.userId + "&email=" + this.userEmail;

                const URL = 'https://api.eosnova.io/email/verify';
                setTimeout(()=>{
                  axios.get( URL+`?id=${this.userId}&email=${escape(this.userEmail)}`)
                    .then( res => {
                      // console.log('email verify ok!!!! ',res);
                      this.$router.push({ name:'Account_create', query: { userEmail: this.userEmail, userId: this.userId, l: this.language }} );
                    })
                    .catch( err => {
                      let errMsg = err.response.data.msg;
                      if( errMsg === 'already verified' ){
                        console.log('verify error : already verified ***');
                        this.$router.push({ name:'Account_create', query: { userEmail: this.userEmail, userId: this.userId, l: this.language }} );
                      }
                      else if ( errMsg === 'expire' ){
                        console.log('verify error : expire ***');
                        this.err = true;
                        this.err_title = 'expire';
                      }
                      else if ( errMsg === 'complete' ){
                        console.log('verify error : complete ***');
                        this.err = true;
                        this.err_title = 'complete';
                      }
                      else {
                        console.log('verify error : no request ***');
                        this.err = true;
                        this.err_title = 'noRequest';
                      }
                    });
                },5000);
              }
            })
            .catch( err => console.log('json error...!!', err, err.response.data.msg) );
        }
      },
      methods : {

      }
    }
</script>
