import Vue from 'vue'
import VueX from 'vuex'
import * as firebase from 'firebase'

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
				date: '2018-03-08 18:00' 
			},
			{ 
				imageUrl: 'https://farm8.staticflickr.com/7387/13333327953_26bc37001e_k.jpg', 
				id:'fgdgdsfsdfjjggckiev', 
				title: 'DevOps Meetup at Kiev',
				location: 'Ocean Plaza',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dicta ipsa totam, quaerat vel quo vitae dolores fugiat odio molestiae quod magni dolore eum quam omnis possimus ad iste voluptatem.',
				date: '2018-04-01 14:00' 
			},
			{
				imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Hotel_Odessa.jpg', 
				id:'fgdgdsfsbbg7767codessa', 
				title: 'Sales`18 Meetup at Odessa',
				location: 'Deribasovskaya, 58',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis dicta ipsa totam, quaerat vel quo vitae dolores fugiat odio molestiae quod magni dolore eum quam omnis possimus ad iste voluptatem.',
				date: '2018-03-22 11:15' 
			}
		],
		user: null
	},
	mutations: {
		addNewMeetup (state, payload) {
			state.loadedMeetups.push(payload)
		},
		setUser(state, payload){
			state.user = payload;
		}
	},
	actions: {
		addNewMeetup ({commit}, payload) {
			const newMeetup = {
					title: payload.title,
					description: payload.description,
					imageUrl: payload.imageUrl,
					location: payload.location,
					date: payload.date.date + ' ' + payload.date.time,
					id: 'fdsfsdjjg'+payload.location.length+payload.location[0]
			}
			commit('addNewMeetup', newMeetup)
		},
		onSignup ({commit}, payload){
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					const NewUser = {
						id: user.uid,
						registeredMeetups: ['']
					}
					commit('setUser', NewUser)
					this.$router.push('/');
				})
				.catch(error => {
					console.log(error)
				})
		},
		onSignin ({commit}, payload){
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					const NewUser = {
						id: user.uid,
						registeredMeetups: ['']
					}
					commit('setUser', NewUser)
					this.$router.push('/');
				})
				.catch(error => {
					console.log(error)
				})
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
		},
		isUserAuthenticated(state){
			return state.user!==null && state.user!== 'undefined' ? true : false;
		},
		user(state){
			return state.user;
		}
	}
})