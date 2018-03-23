import Vue from 'vue'
import VueX from 'vuex'

import meetup from './meetup'
import user from './user'
import shared from './shared'

Vue.use(VueX);

export const store = new VueX.Store({
	modules: {
		meetup: meetup,
		user: user,
		shared: shared
	}
})