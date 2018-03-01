<template>
	<div>
		<v-container>
			<v-layout row wrap>
				<v-flex class="fluid">
					<v-card class="bgcard">
						<v-layout>
							<v-flex>
								<v-card-media src="https://upload.wikimedia.org/wikipedia/commons/4/48/1201044_original_%281%29.jpg" height="300px"></v-card-media>
								<v-card-title primary-title>
									<div>
										<h3>Meetup at Dnipro</h3>
										<hr>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde laborum ab iste nulla, quos iusto exercitationem inventore asperiores sapiente nemo ad aspernatur numquam officia in autem quae perferendis iure velit.</p>
										<strong>27/03/2018</strong>
									</div>
								</v-card-title>
					       <v-card-actions>
					       	<v-spacer></v-spacer>
				          <v-btn right router to="/meetups/1" class="alert">
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