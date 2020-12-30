import Vue from 'vue'
import Router from 'vue-router'
import Email_request from '@/components/email/Email_request'
import Email_verify from '@/components/email/Email_verify'
import Account_create from '@/components/account/Account_create'
import Account_requestInfo from '@/components/account/Account_requestInfo'
import Account_reqRedeem from '@/components/account/Account_reqRedeem'
import Redirect from '@/components/Redirect'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'redirect',
      component: Redirect,
      props: true
    },
    {
      path: '/email/request',
      name: 'Email_request',
      component: Email_request
    },
    {
      path: '/email/verify',
      name: 'Email_verify',
      component: Email_verify
    },
    {
      path: '/account/create',
      name: 'Account_create',
      component: Account_create,
      props: true
    },
    {
      path: '/account/request_info',
      name: 'Account_requestInfo',
      component: Account_requestInfo,
      props: true
    },
    {
      path: '/account/req_redeem',
      name: 'Account_reqRedeem',
      component: Account_reqRedeem,
      props: true
    },
  ]
})
