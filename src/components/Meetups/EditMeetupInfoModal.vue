<template>
		<v-dialog width="400px" persistent v-model="modalOpen">
			<v-btn slot="activator" class="primary">Edit</v-btn>
			<v-card>
				<v-container>
					<v-layout row>
						<v-flex xs12>
							<v-card-title>Edit Meetup</v-card-title>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12>
						  <v-text-field
					      label="Title"
					      id="title"
					      v-model="title"
					      required
					    ></v-text-field>
					  </v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12>
						  <v-text-field
					      label="Location"
					      id="location"
					      v-model="location"
					      required
					    ></v-text-field>
					  </v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12>
						  <v-text-field
					      label="Description"
					      id="description"
					      v-model="description"
					      multi-line
					      required
					    ></v-text-field>
					  </v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12>
							<v-btn @click="modalOpen = false">Close</v-btn>
							<v-btn @click="onClickSave">Save</v-btn>
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
				title: this.meetup.title,
				description: this.meetup.description,
				location: this.meetup.location,
				modalOpen: false
			}
		},
		methods: {
			onClickSave(){
				const meetupObj = {};
				if(this.meetup.title !== null || this.meetup.title !== undefined){
					meetupObj.title = this.title;
				}
				if(this.meetup.description !== null || this.meetup.description !== undefined){
					meetupObj.description = this.description;
				}
				if(this.meetup.location !== null || this.meetup.location !== undefined){
					meetupObj.location = this.location;
				}
				meetupObj.id = this.meetup.id;
				this.$store.dispatch('updateMeetup', meetupObj);
			}
		}
	}
</script>