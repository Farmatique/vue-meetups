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
		},
		updateMeetup(state, payload){
			const updatedMeetup = state.loadedMeetups.find(meetups => {
				return meetups.id === payload.id;
			})
			if(payload.title !== undefined){
				updatedMeetup.title = payload.title
			}
			if(payload.description !== undefined){
				updatedMeetup.description = payload.description
			}
			if(payload.location !== undefined){
				updatedMeetup.location = payload.location
			}
			if(payload.date !== undefined){
				updatedMeetup.date = payload.date
			}
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
		}
	},
	actions: {
		addNewMeetup ({commit, getters}, payload) {
			const newMeetup = {
					title: payload.title,
					description: payload.description,
					imageUrl: payload.imageUrl,
					location: payload.location,
					date: payload.date,
					creatorId: getters.user.id
			}
			let imageUrl = payload.imageUrl;
			let key;
			firebase.database().ref('meetups').push(newMeetup)
				.then(data => {
					key = data.key;
					return key;
				})
				.then(key => {
					const ext = payload.image.name.slice(payload.image.name.lastIndexOf('.') + 1);
					return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image);
				})
				.then(file => {
					imageUrl = file.metadata.downloadURLs[0];
					firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
				})
				.then(() => {
					commit('addNewMeetup', {
						id: key,
						imageUrl: imageUrl,
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
							date: dataVal[key].date,
							creatorId: dataVal[key].creatorId
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
		updateMeetup({commit}, payload){
			commit('setLoading', true);
			const updateObj = {id: payload.id};
			if(payload.title !== undefined){
				updateObj.title = payload.title
			}
			if(payload.description !== undefined){
				updateObj.description = payload.description
			}
			if(payload.location !== undefined){
				updateObj.location = payload.location
			}
			if(payload.date !== undefined){
				updateObj.date = payload.date
			}
			firebase.database().ref('meetups').child(payload.id).update(updateObj)
				.then(() => {
					commit('updateMeetup', updateObj);
					commit('setLoading', false);
				})
				.catch(error => {
					console.log(error);
					commit('setLoading', false);
				})
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