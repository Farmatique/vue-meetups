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
import EditMeetupInfoModal from './components/Meetups/EditMeetupInfoModal.vue'
import EditMeetupDateModal from './components/Meetups/EditMeetupDateModal.vue'
import RegisterModal from './components/Meetups/RegisterModal.vue'
import CalendarModal from './components/User/CalendarModal.vue'

Vue.filter('date', DateFilter)
Vue.component('error-alert', ErrorAlert)
Vue.component('edit-meetup-info-modal', EditMeetupInfoModal)
Vue.component('edit-meetup-date-modal', EditMeetupDateModal)
Vue.component('register-modal', RegisterModal)
Vue.component('calendar-modal', CalendarModal)

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken1,
    secondary: colors.teal.lighten4,
    accent: colors.teal.accent4,
    info: colors.teal.lighten1,
    alert: colors.teal.accent3,
    background: colors.teal.lighten5,
    headerColor: colors.teal.lighten3,
    lighten2: colors.teal.lighten2,
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
		  storageBucket: "gs://meetups-a0391.appspot.com"
  	})
  	this.$store.dispatch('fetchMeetups');
  	firebase.auth().onAuthStateChanged(user => {
  		this.$store.dispatch('autoLogin', user);
  		this.$store.dispatch('fetchUserData');
  		if(user !== null){
  			this.$store.commit('setAuthUser');
  		}
  	})
  }
})