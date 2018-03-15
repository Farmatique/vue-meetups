import Vue from 'vue'
import VueX from 'vuex'
import * as firebase from 'firebase'

Vue.use(VueX);

export const store = new VueX.Store({
	state: {
		loadedMeetups: [],
		user: null,
		loading: false,
		error: null
	},
	mutations: {
		setMeetups(state, payload){
			state.loadedMeetups = payload;
		},
		addNewMeetup (state, payload) {
			state.loadedMeetups.push(payload)
		},
		setUser(state, payload){
			state.user = payload;
		},
		setError(state, payload){
			state.error = payload;
		},
		setLoading(state, payload){
			state.loading = payload
		},
		clearError(state){
			state.error = false
		}
	},
	actions: {
		addNewMeetup ({commit, getters}, payload) {
			const newMeetup = {
					title: payload.title,
					description: payload.description,
					imageUrl: payload.imageUrl,
					location: payload.location,
					date: payload.date.date + ' ' + payload.date.time,
					creatorId: getters.user.id
			}
			firebase.database().ref('meetups').push(newMeetup)
				.then(data => {
					console.log(data)
					commit('addNewMeetup', {
						id: data.key,
						...newMeetup
					})
				})
				.catch(error => {
					console.log(error)
				})
		},
		onSignup ({commit}, payload){
			commit('setLoading', true)
			commit('clearError')
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					commit('setLoading', false)
					const NewUser = {
						id: user.uid,
						registeredMeetups: ['']
					}
					commit('setUser', NewUser)
					//this.$router.push('/');
				})
				.catch(error => {
					commit('setError', error.message)
					commit('setLoading', false)
					console.log(error)
				})
		},
		onSignin ({commit, dispatch}, payload){
			commit('setLoading', true)
			commit('clearError')
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(user => {
					commit('setLoading', false)
					const NewUser = {
						id: user.uid,
						registeredMeetups: ['']
					}
					commit('setUser', NewUser);
					dispatch('fetchMeetups');
					//this.$router.push('/');
				})
				.catch(error => {
					commit('setError', error.message)
					commit('setLoading', false)
					console.log(error)
				})
		},
		clearError({commit}){
			commit('clearError')
		},
		fetchMeetups({commit}){
			commit('setLoading', true);
			firebase.database().ref('meetups').once('value')
				.then(data => {
					const dataVal = data.val();
					const meetups = [];
					for(let key in dataVal){
						meetups.push({
							id: key,
							imageUrl: dataVal[key].imageUrl,
							title: dataVal[key].title,
							location: dataVal[key].location,
							description: dataVal[key].description,
							date: dataVal[key].date
						})
					};
					commit('setMeetups', meetups);
					commit('setLoading', false);
				})
				.catch(error => {
					console.log(error);
					commit('setLoading', false);
				})
		},
		autoLogin({commit, getters}, payload){
			if(!getters.isUserAuthenticated){
				if(payload != null){
					commit('setUser', {id: payload.uid, registeredMeetups: []})
				} else {
					commit('setUser', null)
				}
			}
		},
		logout({commit}){
			firebase.auth().signOut();
			commit('setUser', null);
			//this.$router.push('/');
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
		},
		getError(state){
			return state.error;
		},
		isLoading(state){
			return state.loading;
		}
	}
})