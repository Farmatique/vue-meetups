import Vue from 'vue'
import VueX from 'vuex'

Vue.use(VueX);

export const store = new VueX.Store({
	state: {
		loadedMeetups: [
			{ 
				imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/1201044_original_%281%29.jpg', 
				id:'fgdgdsfsdfdnipro', 
				title: 'JS Meetup at Dnipro',
				location: 'Menora Centre',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dicta ipsa totam, quaerat vel quo vitae dolores fugiat odio molestiae quod magni dolore eum quam omnis possimus ad iste voluptatem.',
				date: '2018/03/20' 
			},
			{ 
				imageUrl: 'https://farm8.staticflickr.com/7387/13333327953_26bc37001e_k.jpg', 
				id:'fgdgdsfsdfjjggckiev', 
				title: 'DevOps Meetup at Kiev',
				location: 'Ocean Plaza',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dicta ipsa totam, quaerat vel quo vitae dolores fugiat odio molestiae quod magni dolore eum quam omnis possimus ad iste voluptatem.',
				date: '2018/01/02' 
			},
			{
				imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Hotel_Odessa.jpg', 
				id:'fgdgdsfsbbg7767codessa', 
				title: 'Sales`18 Meetup at Odessa',
				location: 'Deribasovskaya, 58',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dicta ipsa totam, quaerat vel quo vitae dolores fugiat odio molestiae quod magni dolore eum quam omnis possimus ad iste voluptatem.',
				date: '2018/02/20' 
			}
		],
		user: {
			id: 'ffgfdgrerrweppo3',
			registeredMeetups: ['fgdgdsfsdfjjggc']
		}
	},
	mutations: {
		addNewMeetup (state, payload) {
			state.loadedMeetups.push(payload)
		}
	},
	actions: {
		addNewMeetup ({commit}, payload) {
			const newMeetup = {
					title: payload.title,
					description: payload.description,
					imageUrl: payload.imageUrl,
					location: payload.location,
					date: new Date(),
					id: 'fdsfsdjjg'+payload.location.length+payload.location[0]
			}
			commit('addNewMeetup', newMeetup)
		}
	},
	getters: {
		loadedMeetups(state){
			return state.loadedMeetups.sort((a, b) => { return a.date > b.date})
		},
		featuredMeetups(state, getters){
			return getters.loadedMeetups.slice(0, 2)
		},
		loadedMeetup(state){
			return (meetupId) => {
				return state.loadedMeetups.find((item)=>{
					return item.id === meetupId;
				})
			}
		}
	}
})