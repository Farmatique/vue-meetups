import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import ErrorAlert from './components/Shared/ErrorAlert.vue'

Vue.filter('date', DateFilter)
Vue.component('error-alert', ErrorAlert)

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken1,
    secondary: colors.teal.lighten4,
    accent: colors.teal.accent4,
    info: colors.teal.lighten1,
    alert: colors.teal.accent3,
    headerColor: colors.teal.lighten3,
    buttonPrimary: colors.teal.lighten2
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
  	firebase.initializeApp({
	    apiKey: "AIzaSyBDMeA4Q1_dKjxYrOcfTTwBfQgp1bz1kt4",
		  authDomain: "meetups-a0391.firebaseapp.com",
		  databaseURL: "https://meetups-a0391.firebaseio.com",
		  projectId: "meetups-a0391",
		  storageBucket: ""
  	})
  	this.$store.dispatch('fetchMeetups');
  }
})