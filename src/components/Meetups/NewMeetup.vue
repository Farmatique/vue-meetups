<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 mt-3>
				<h2 class="flex xs12 sm6 offset-sm3 mb-2 ">Create a new Meetup</h2>
				<form @submit.prevent="addNewMeetup">
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
						  <v-text-field
					      label="Title"
					      v-model="title"
					      id="title"
					      required
					    ></v-text-field>
					    <v-text-field
					      label="Location"
					      v-model="location"
					      id="location"
					      required
					    ></v-text-field>
					    <v-text-field
					      label="Image URL"
					      v-model="imageUrl"
					      id="image_url"
					      required
					    ></v-text-field>
					    <img :src="imageUrl" style="max-width: 100%">
					    <v-text-field
					      label="Description"
					      v-model="description"
					      id="description"
					      multi-line
					      required
					    ></v-text-field>

					    
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex flex xs12 sm6 offset-sm3>
							<v-date-picker v-model="date"></v-date-picker>
							<v-time-picker v-model="time"></v-time-picker>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex flex xs12 sm6 offset-sm3>
							<v-btn type="submit" :disabled="!isFormValid" class="primary">Add New Meetup</v-btn>
						</v-flex>
					</v-layout>
				</form>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				title: '',
				description: '',
				imageUrl: '',
				location: '',
				date: null,
				time: null
			}
		},
		computed: {
			isFormValid () {
				return this.title !== '' &&
							this.description !== '' &&
							this.imageUrl !== '' &&
							this.location !== ''
			},
			convertedDate () {
				const fullDate = {date: this.date, time: this.time}
				return fullDate;
			}
		},
		methods: {
			addNewMeetup () {
				const newMeetup = {
					title: this.title,
					description: this.description,
					imageUrl: this.imageUrl,
					location: this.location,
					date: this.convertedDate
				}
				this.$store.dispatch('addNewMeetup', newMeetup)
				this.$router.push('/meetups')
			}
		}
	}
</script>