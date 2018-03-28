<template>
  <v-dialog persistent v-model="modalOpen">
  	<v-btn slot="activator">Schedule of meetups</v-btn>
    <v-date-picker
    :events="meetupsDatesArray"
    event-color="red"
  ></v-date-picker>
  <v-btn class="close-btn btn--depressed transparent" @click="modalOpen = false">
  	<v-icon flat>clear</v-icon>
  </v-btn>	
	</v-dialog>
</template>
<script>
	export default{
		data() {
			return {
				modalOpen: false
			}
		},
		computed: {
			meetupsDatesArray(){
				const meetups = this.$store.getters.getAuthUserRegisteredMeetups;
				const dates = [];
				meetups.map(meetup => {
					dates.push(meetup.date.substr(0, 10))
				})
	    	return dates
			}
		}
	}
</script>
<style>
	.dialog{
		width: auto;
		position: relative;
	}
	.close-btn{
		position: absolute;
		top: 0;
		right: 0;
		min-width: 0;
	}
</style>