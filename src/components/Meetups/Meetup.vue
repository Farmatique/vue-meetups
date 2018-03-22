<template>
	<div>
		<v-container>
			<v-layout row v-if="loading">
				<v-flex xs12 class="text-xs-center">
					<v-progress-circular 
						indeterminate 
						color="red"
						:size="70"
						:width="2"
						>
					</v-progress-circular>
				</v-flex>
			</v-layout>
			<v-layout row wrap v-else>
				<v-flex class="fluid">
					<v-card class="headerColor">
						<v-layout>
							<v-flex>
								<v-card-title primary-title class="secondary">
									<h2>{{ meetup.title }}</h2>
									<v-spacer></v-spacer>
									<template>
										<edit-meetup-info-modal v-if="isUserCreator" :meetup="meetup"></edit-meetup-info-modal>
									</template>
								</v-card-title>
								<v-card-media :src="meetup.imageUrl" height="300px"></v-card-media>
				        <v-card-text>
				        		<span>Location: </span> <strong>{{ meetup.location }}</strong>
				        		<br>
										<span>Date: </span><strong>{{ meetup.date | date }}</strong>
										<edit-meetup-date-modal v-if="isUserCreator" :meetup="meetup"></edit-meetup-date-modal>
										<p>{{ meetup.description }}</p>
				        </v-card-text>
				       	<v-card-actions>
					       	<v-spacer></v-spacer>
									<register-modal :meetupId="meetup.id" v-if="isUserAuth"></register-modal>
				        </v-card-actions>
			        </v-flex>
						</v-layout>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	export default {
		props: ['id'],
		computed:{
			meetup(){
				return this.$store.getters.loadedMeetup(this.id)
			},
			loading(){
				return this.$store.getters.isLoading
			},
			isUserCreator(){
				if(this.$store.getters.user){
					return this.meetup.creatorId === this.$store.getters.user.id
				}
				return false;
			},
			isUserAuth(){
				return this.$store.getters.user !== null
			}
		}
	}
</script>