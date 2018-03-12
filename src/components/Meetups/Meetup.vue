<template>
	<div>
		<v-container>
			<v-layout row wrap>
				<v-flex class="fluid">
					<v-card class="headerColor">
						<v-layout>
							<v-flex>
								<v-card-title primary-title class="secondary">
									<h2>{{ meetup.title }}</h2>
								</v-card-title>
								<v-card-media :src="meetup.imageUrl" height="300px"></v-card-media>
				        <v-card-text>
				        		<span>Location: </span> <strong>{{ meetup.location }}</strong>
				        		<br>
										<span>Date: </span><strong>{{ meetup.date | date }}</strong>
										<p>{{ meetup.description }}</p>
				        </v-card-text>
				       	<v-card-actions>
					       	<v-spacer></v-spacer>
				          <v-btn right router to="/meetups/1" class="buttonPrimary">
				          	<v-icon flat left>info</v-icon>
					          Register
					        </v-btn>
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
			}
		}
	}
</script>