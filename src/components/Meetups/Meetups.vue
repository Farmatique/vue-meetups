<template>
	<div>
		<v-layout row wrap>
			<v-flex class="xs8 offset-xs2">
				<v-card class="secondary">
					<v-layout row>
						<v-flex class="xs4">
							<v-card-media src="https://upload.wikimedia.org/wikipedia/commons/4/48/1201044_original_%281%29.jpg" height="200px"></v-card-media>
						</v-flex>
						<v-flex class="xs8">
							<v-card-title primary-title>
								<div>
									<h3>Meetup at Dnipro</h3>
									<p>27/03/2018</p>
								</div>
							</v-card-title>
				       <v-card-actions>
			          <v-btn router to="/meetups/1" flat>
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