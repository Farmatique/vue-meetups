import * as firebase from 'firebase'

export default {
	state: {
		loadedMeetups: [],
		authUserRegisteredMeetups: [],
		authUserSelfMeetups: []
	},
	mutations: {
		setMeetups(state, payload){
			state.loadedMeetups = payload;
		},
		addNewMeetup (state, payload) {
			state.loadedMeetups.push(payload)
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
			if(payload.registered !== undefined){
				updatedMeetup.registered = payload.registered
			}
		},
		setAuthUserRegisteredMeetups(state, payload){
			state.authUserRegisteredMeetups = payload
		},
		setAuthUserSelfMeetups(state, payload){
			state.authUserSelfMeetups = payload
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
					creatorId: getters.user.id,
					registered: 0
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
		fetchMeetups({commit, getters}){
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
							creatorId: dataVal[key].creatorId,
							registered: dataVal[key].registered
						})
					};
					commit('setMeetups', meetups);
					if(getters.user !== null){
						commit('setAuthUserRegisteredMeetups')
					}
					commit('setLoading', false);
				})
				.catch(error => {
					console.log(error);
					commit('setLoading', false);
				})
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
			if(payload.registerCountChange !== undefined){
				const changedRegCount = payload.registered + payload.registerCountChange;
				updateObj.registered = changedRegCount;
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
		setAuthUserRegisteredMeetups({commit, getters}){
			const registeredMeetups = getters.user.registeredMeetups;
			const loadedMeetups = getters.loadedMeetups;
			let filtered = [];
			for(let key in registeredMeetups){
				const current = loadedMeetups.find(meetup => {
					return meetup.id === registeredMeetups[key].id
				})
				filtered.push(current);
			}
			commit('setAuthUserRegisteredMeetups', filtered);
		},
		setAuthUserSelfMeetups({commit, getters}){
			const userId = getters.getAuthUser.id;
			const loadedMeetups = getters.loadedMeetups;
			const filtered = loadedMeetups.filter(meetup => {
				return meetup.creatorId === userId;
			})
			commit('setAuthUserSelfMeetups', filtered);
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
		getAuthUserRegisteredMeetups(state){
			return state.authUserRegisteredMeetups;
		},
		getAuthUserSelfMeetups(state){
			return state.authUserSelfMeetups;
		}
	}
}