<template>
    <div>
      Email_verify
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Email_verify",
        data() {
          return {
            userEmail : '',
            userId : '',
          }
        },
        created(){
        // this.userEmail = this.$route.params.userEmail;
        // this.userId = this.$route.params.userId;
        this.userEmail = 'seul@wzdworks.net';
        this.userId = '5b9ef81f42fdcb74b8339b42';

        const URL = 'https://create.eosnova.io/email/verify';

        let data = new URLSearchParams();
        data.append('id', this.userId);
        data.append('email', this.userEmail);

        axios.get( URL+`?id=${this.userId}&email=${this.userEmail}`)
          .then( res => {
            console.log('email verify ok!!!!!!!!!! ',res);
            this.$router.push({ name:'Account_create', params: { userEmail : this.userEmail, userId : this.userId }} );
          })
          .catch( err => {
            console.log('email verify error...!!', err.response.data.msg);
            let errMsg = err.response.data.msg;
            if( errMsg === 'already verified' ){
              this.$router.push({ name:'Account_create', params: { userEmail : this.userEmail, userId : this.userId }} );
            }
            else if ( errMsg === 'expire' ){
              console.log('verify error : expire ***');
              this.$router.push({ name:'Email_request', params: { status : 'timeOut' }} );
            }
            else {
              console.log('verify error : no request ***');
            }
          });
      },
      methods : {

      }
    }
</script>

<style scoped>

</style>
