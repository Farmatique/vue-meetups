<template>
		<v-dialog width="350px" persistent v-model="modalOpen">
			<v-btn slot="activator" class="primary">{{ !isUserRegistered ? 'Register' : 'Unregister' }}</v-btn>
			<v-card>
				<v-container>
					<v-layout row>
						<v-flex xs12>
							<v-card-title v-if="!isUserRegistered">Register for meetup?</v-card-title>
							<v-card-title v-else>Unregister from meetup?</v-card-title>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12>
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