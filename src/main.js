import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken1,
    secondary: colors.teal.lighten4,
    accent: colors.teal.accent4,
    info: colors.teal.lighten1,
    alert: colors.teal.accent3,
    bgcard: colors.teal.lighten3
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
