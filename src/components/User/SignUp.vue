<template>
	<v-container>
		<v-layout v-if="showError">
			<v-flex sm6 offset-sm3 xs12>
				<error-alert :showError="showError"></error-alert>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex sm6 offset-sm3 xs12>
				<h2>Sign Up</h2>
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
	          value=""
	          v-model="password"
	          type="password"
	          required
	        ></v-text-field>
					<v-text-field
	          name="confirmPassword"
	          label="Confirm Password"
	          value=""
	          v-model="confirmPassword"
	          type="password"
	          :rules="[isPasswordsMatch]"
	        ></v-text-field>
	        <v-btn type="submit" :loading="loading" :disabled="!isPasswordCorrect">
	        	Sign Up
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
				password: '',
				confirmPassword: ''
			}
		},
		computed: {
			isPasswordsMatch (){
				return this.password !== this.confirmPassword ? 'Passwords doesnt match' : true
			},
			isPasswordCorrect(){
				if(this.password !== null && this.password!==''){
					return this.password == this.confirmPassword ? true : false
				}
			},
			showError(){
				return this.$store.getters.getError;
			},
			loading(){
				return this.$store.getters.isLoading;
			}
		},
		methods: {
			onSubmit (){
				this.$store.dispatch('onSignup', {email: this.email, password: this.password})
			}
		}
	}
</script>