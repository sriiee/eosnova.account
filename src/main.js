import "@babel/polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

require('./assets/reset.css');
require('./assets/style.css');
require('./assets/responsive.css');

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
