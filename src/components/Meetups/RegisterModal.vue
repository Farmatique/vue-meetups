<template>
		<v-dialog width="350px" persistent v-model="modalOpen">
			<v-btn slot="activator" class="primary">{{ !isUserRegistered ? 'Register' : 'Unregister' }}</v-btn>
			<v-card>
				<v-container>
					<v-layout row mb-3>
						<v-flex xs12>
							<h3 v-if="!isUserRegistered">Register for meetup?</h3>
							<h3 v-else>Unregister from meetup?</h3>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 text-xs-center>
							<v-btn @click="modalOpen = false">Close</v-btn>
							<v-btn class="green--text" @click="onConfirm">Confirm</v-btn>
						</v-flex>
					</v-layout>
				</v-container>
			</v-card>
		</v-dialog>
</template>
<script>
	export default{
		props: ['meetup'],
		data(){
			return{
				modalOpen: false
			}
		},
		computed: {
			isUserRegistered(){
				return (this.$store.getters.user.registeredMeetups.findIndex(meetup => {
					return meetup.id === this.meetup.id;
				}) >= 0)
			}
		},
		methods: {
			onConfirm(){
				if(!this.isUserRegistered){
					this.$store.dispatch('registerForMeetup', this.meetup)
				} else {
					this.$store.dispatch('unregisterFromMeetup', this.meetup)
				}
			}
		}
	}
</script>