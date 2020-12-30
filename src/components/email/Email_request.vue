<template>
  <div class="table">
    <div class="wrapCell cell">

      <div class="contWrap">
        <div class="titleBox">
          <p><img src="../../assets/logo.png" alt="NOVA Wallet" style="width:120px;"/></p>
          <h1>
            <span>계정</span>
            <span>생성하기</span>
          </h1>
          <h2 class="sub">Create Account</h2>
          <p class="btmIcon"><img src="../../assets/icon-create-account.png" style="width:230px"/></p>
        </div>
        <div class="contentBox table">
          <div class="cell">
            <v-form ref="form" v-model="valid" lazy-validation>
              <div class="inputBox">
                <v-text-field
                  v-model="userEmail"
                  :rules="emailRules"
                  placeholder="이메일을 입력해 주세요."
                  hint="입력한 이메일로 인증 링크를 발송합니다."
                  persistent-hint
                  required
                ></v-text-field>
                <input type="button" value="" class="resetBtn" @click="resetInput"/>
              </div>
              <div class="btnCont abs">
                <input type="button"
                  :disabled="!valid"
                  class="btn sm one"
                  v-bind:class="[ valid ?  'grdt' : 'default' ]"
                  value ="메일 보내기"
                  @click="mailSend"
                />
              </div>
            </v-form>
          </div>
        </div>
      </div>

      <!-- dialog - 메일발송완료 -->
      <v-dialog
        v-model="dialog"
        width="420"
      >
        <v-card>
          <v-card-text>
            <p class="diaImg mail"><img src="../../assets/mail.png" style="width:72px"/></p>
            <h3>메일 발송 완료</h3>
            <p class="ment">
              입력한 메일 주소로 인증 링크를 발송했습니다.<br/>
              메일을 확인하세요.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialog = false"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- //dialog - 메일발송완료 -->
      <!-- dialog - 시간초과 -->
      <v-dialog
        v-model="timeOut"
        width="420"
      >
        <v-card>
          <v-card-text>
            <p class="diaImg mail"><img src="../../assets/timeOut.png" style="width:72px"/></p>
            <h3>시간 초과</h3>
            <p class="ment">
              이메일 인증 시간을 초과했습니다.<br/>
              계정 생성을 다시 진행하세요.
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="timeDialogExit"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- //dialog - 시간초과 -->

    </div>
  </div>
</template>

<script>
    import axios from 'axios'
    const URL = 'http://create.eosnova.io/email/request';
    export default {
        name: "Email_request",
        data() {
          return {
            valid: false,
            userEmail: 'seul@wzdworks.net',
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(v) || '입력 형식이 올바르지 않습니다.'
            ],
            emailVali : false,
            dialog : false,
            timeOut : false,
            status : '',
          }
        },
        created(){
          this.status = this.$route.params.status;
          if( this.status === 'timeOut' ){
            this.timeOut = true;
          }
          // console.log('status@@@',this.status);
        },
        methods : {
          resetInput(){
            this.userEmail = '';
          },
          mailSend(){
            let data = new URLSearchParams();
            data.append('email', this.userEmail);
            // console.log('send!!', this.userEmail);
            axios.post( URL, data,
              { headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }})
              .then( res => {
                console.log('email ok!!!!!!!!!! ',res);
                this.userEmail = '';
                this.dialog = true;
              })
              .catch( err => console.log('email error...!!', err) );
          },
          timeDialogExit(){
            this.timeOut = false;
          }
        }
    }
</script>

<style scoped>
</style>
