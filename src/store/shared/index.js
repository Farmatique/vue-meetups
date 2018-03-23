export default {
	state: {
		loading: false,
		error: null
	},
	mutations: {
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
		clearError({commit}){
			commit('clearError')
		}
	},
	getters: {
		getError(state){
			return state.error
		},
		isLoading(state){
			return state.loading
		}
	}
}