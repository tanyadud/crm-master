import Vue from 'vue'
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from "@/filters/currency.filter";
import localizeFilter from "@/filters/localize.filter";
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'

import 'materialize-css/dist/js/materialize.min'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyBA1O2CIcIfTCzz98VdMjsmUvrbBDS7dMI",
  authDomain: "vue-system-crm.firebaseapp.com",
  databaseURL: "https://vue-system-crm.firebaseio.com",
  projectId: "vue-system-crm",
  storageBucket: "vue-system-crm.appspot.com",
  messagingSenderId: "315353681558",
  appId: "1:315353681558:web:b807d853da135f83007cb7"
}

let app

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

