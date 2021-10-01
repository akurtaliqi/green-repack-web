import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import './plugins'
import http from './http-common/http-common'
import store from './store'
import { StripePlugin } from '@vue-stripe/vue-stripe';

Vue.config.productionTip = false

const options = {
  pk: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeAccount: process.env.STRIPE_ACCOUNT,
  apiVersion: process.env.API_VERSION,
  locale: process.env.LOCALE,
};

new Vue({
  router,
  vuetify,
  store,
  StripePlugin,
  render: h => h(App),
}).$mount('#app')
