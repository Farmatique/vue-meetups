<template>
	<v-container>
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
	        <v-btn type="submit">Log In</v-btn>
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