<template>
	<v-container>
		<v-layout v-if="showError">
			<v-flex sm6 offset-sm3 xs12>
				<error-alert :showError="showError"></error-alert>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex sm6 offset-sm3 xs12>
				<h2>Sign In</h2>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex sm6 offset-sm3 xs12>
				<form @submit.prevent="onSubmit">
					<v-text-field
	          name="email"
	          label="Email"
	          value="Your Email"
	          v-model="email"
	          type="text"
	          required
	        ></v-text-field>
					<v-text-field
	          name="password"
	          label="Password"
	          value="Your Password"
	          v-model="password"
	          type="password"
	          required
	        ></v-text-field>
	        <v-btn type="submit" :loading="loading">
	        	Log In
    	      <span slot="loader" class="custom-loader">
			        <v-icon light>cached</v-icon>
			      </span>
	        </v-btn>
				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		data () {
			return {
				email: '',
				password: ''
			}
		},
		computed: {
			user(){
				return this.$store.getters.user
			},
			showError(){
				return this.$store.getters.getError;
			},
			loading(){
				return this.$store.getters.isLoading;
			}
		},
		watch: {
			user (value){
				if (value !== null && value !== 'undefined'){
					this.$router.push('/')
				}
			}
		},
		methods: {
			onSubmit (){
				this.$store.dispatch('onSignin', {email: this.email, password: this.password})
			}
		}
	}
</script>