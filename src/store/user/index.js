import * as firebase from 'firebase'

export default {
	state: {
		user: null,
		authUser: {}
	},
	mutations: {
		setUser(state, payload){
			state.user = payload;
		},
		registerForMeetup(state, payload){
			const registeredMeetup = {
				id: payload.id,
				firebaseKey: payload.firebaseKey
			}
			state.user.registeredMeetups.push(registeredMeetup)
		},
		unregisterFromMeetup(state, payload){
			const currentMeetup = state.user.registeredMeetups.findIndex(meetup => {
				return meetup.id === payload.id
			})
			state.user.registeredMeetups.splice(currentMeetup, 1)
		},
		setAuthUser(state){
			const user = firebase.auth().currentUser;
			state.authUser.email = user.email;
			state.authUser.id = user.uid
		}
	},
	actions: {
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
		autoLogin({commit, getters}, payload){
			if(!getters.isUserAuthenticated){
				if(payload != null){
					commit('setUser', {id: payload.uid, registeredMeetups: []})
				} else {
					commit('setUser', null)
				}
			}
		},
		fetchUserData({commit, getters}){
			if(getters.user){
				commit('setLoading', true);
				firebase.database().ref('users/' + getters.user.id + /registrations/).once('value')
					.then(data => {
						const formatData = data.val();
						const registeredMeetups = [];
						for(let key in formatData){
							registeredMeetups.push({id: formatData[key], firebaseKey: key})
						}
						commit('setUser', {id: getters.user.id, registeredMeetups: registeredMeetups});
						commit('setLoading', false);
					})
					.catch(error => {
						console.log(error);
						commit('setLoading', true);
					})
			}
		},
		logout({commit}){
			firebase.auth().signOut();
			commit('setUser', null);
			//this.$router.push('/');
		},
		registerForMeetup({commit, getters}, payload){
			if(getters.user.registeredMeetups.findIndex(meetup => { return meetup.id === payload;}) >= 0){
				return
			}
			commit('setLoading', true);
			// console.log(payload)
			firebase.database().ref('users/' + getters.user.id + '/registrations/').push(payload)
				.then(data => {
					commit('setLoading', false);
					// console.log('returned key: '+data.key);
					commit('registerForMeetup', {id: payload, firebaseKey: data.key});
				})
				.catch(error => {
					console.log(error)
				})
		},
		unregisterFromMeetup({commit, getters}, payload){
			commit('setLoading', true);
			const registeredMeetup = getters.user.registeredMeetups.find(elem => elem.id === payload);
			firebase.database().ref('users/' + getters.user.id + '/registrations/').child(registeredMeetup.firebaseKey).remove()
				.then(() => {
					commit('setLoading', false);
					commit('unregisterFromMeetup', {id: payload, firebaseKey: registeredMeetup.firebaseKey});
				})
				.catch(error => {
					console.log(error)
				}) 
		}
	},
	getters: {
		isUserAuthenticated(state){
			return state.user!==null && state.user!== 'undefined' ? true : false;
		},
		user(state){
			return state.user
		},
		getAuthUser(state){
			return state.authUser
		}
	}
}