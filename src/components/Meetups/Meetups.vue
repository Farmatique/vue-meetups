<template>
	<div>
		<v-layout row wrap v-for="meetup in meetups" class="mb-2 mt-2">
			<v-flex class="xs8 offset-xs2">
				<v-card class="secondary">
					<v-layout row>
						<v-flex class="xs4">
							<v-card-media :src="meetup.imageUrl" height="200px"></v-card-media>
						</v-flex>
						<v-flex class="xs8">
							<v-card-title primary-title>
								<div>
									<h3>{{ meetup.title }}</h3>
									<p>{{ meetup.date | date }}</p>
								</div>
							</v-card-title>
				       <v-card-actions>
			          <v-btn router :to="'/meetups/' + meetup.id" class="headerColor">
			          	<v-icon flat left>info</v-icon>
				          More
				        </v-btn>
			        </v-card-actions>
						</v-flex>
					</v-layout>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	export default{
		computed: {
			meetups(){
				return this.$store.getters.loadedMeetups
			}
		}
	}
</script>