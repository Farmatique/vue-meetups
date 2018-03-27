<template>
		<v-dialog width="650px" persistent v-model="modalOpen">
			<v-btn slot="activator" class="primary">Edit Date & Time</v-btn>
			<v-card>
				<v-container>
					<v-layout row mb-3>
						<v-flex xs12>
							<h3>Edit Meetup Date & Time</h3>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12>
							<v-date-picker 
								v-model="editableDate"
							></v-date-picker>
							<v-time-picker 
								v-model="editableTime"
								format="24hr"
								></v-time-picker>
					  </v-flex>
					</v-layout>
						<v-flex xs12>
							<v-btn @click="modalOpen = false">Close</v-btn>
							<v-btn class="green--text" @click="onClickSave">Save</v-btn>
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
				editableDate: null,
				editableTime: null,
				modalOpen: false
			}
		},
		methods: {
			onClickSave(){
				const meetupObj = {};
				let newDate = new Date();
				if(this.editableDate !== null || this.editableDate !== undefined){
					let date = new Date(this.editableDate);

					let day = date.getUTCDate();
					let month = date.getUTCMonth();
					let year = date.getUTCFullYear();

					newDate.setUTCDate(day);
					newDate.setUTCMonth(month);
					newDate.setUTCFullYear(year);
				}
				if(this.editableTime !== null || this.editableTime !== undefined){
					let hours = this.editableTime.split(':')[0];
					let minutes = this.editableTime.split(':')[1];

					newDate.setHours(hours);
					newDate.setMinutes(minutes);
				}
				meetupObj.date = newDate;
				meetupObj.id = this.meetup.id;
				this.$store.dispatch('updateMeetup', meetupObj);
			}
		},
		created(){
			let date = new Date(this.meetup.date);
			let newDate = new Date();

			let day = date.getUTCDate();
			let month = date.getUTCMonth();
			let year = date.getUTCFullYear();
			let hours = date.getHours();
			let minutes = date.getMinutes();

			this.editableDate = year + '-' + (month+1) + '-' + day;
			this.editableTime = hours + ':' + minutes;
		}
	}
</script>