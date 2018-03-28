<template>
<v-container>
			<v-layout row wrap>
				<v-flex class="fluid">
					<v-card class="headerColor">
						<v-layout>
							<v-flex>
								<v-card-title primary-title class="secondary">
									<h2>User Profile</h2>
								</v-card-title>
				        <v-card-text>
				        		<span>Username (email): </span> <strong>{{ authUser.email }}</strong>
				        </v-card-text>
				       	<v-card-actions>
					       	<v-spacer></v-spacer>
   								<calendar-modal v-if="meetups.length > 0"></calendar-modal>
									<v-btn @click="logout">Logout</v-btn>
				        </v-card-actions>
			        </v-flex>
						</v-layout>
					</v-card>
				</v-flex>
			</v-layout>
			<v-layout row wrap class="mt-2 lighten2">
				<v-flex class="fluid">
					<v-card class="headerColor">
						<v-layout>
							<v-flex>
								<v-card-title primary-title class="headerColor">
									<h2>Registered Meetups</h2>
								</v-card-title>
			        </v-flex>
						</v-layout>
					</v-card>
				</v-flex>
				<v-flex class="xs10 offset-xs1">
					<v-card v-for="meetup in meetups" class="secondary mb-2 mt-2">
						<v-layout row>
							<v-flex class="xs4">
								<v-card-media :src="meetup.imageUrl" height="200px"></v-card-media>
							</v-flex>
							<v-flex class="xs">
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
					<v-layout row v-if="meetups.length == 0" class="mt-3 mb-3">
						<v-flex class="xs12">
							<h3>You haven`t registered at any meetup yet</h3>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
			<v-layout row wrap class="mt-2 lighten2">
				<v-flex class="fluid">
					<v-card class="headerColor">
						<v-layout>
							<v-flex>
								<v-card-title primary-title class="headerColor">
									<h2>User`s Meetups</h2>
								</v-card-title>
			        </v-flex>
						</v-layout>
					</v-card>
				</v-flex>
				<v-flex class="xs10 offset-xs1">
					<v-card v-for="meetup in selfMeetups" class="secondary mb-2 mt-2">
						<v-layout row>
							<v-flex class="xs4">
								<v-card-media :src="meetup.imageUrl" height="200px"></v-card-media>
							</v-flex>
							<v-flex class="xs">
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
					<v-layout row v-if="meetups.length == 0" class="mt-3 mb-3">
						<v-flex class="xs12">
							<h3>You haven`t created any meetup yet</h3>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</v-container>
</template>
<script>
	export default{
		computed: {
			authUser(){
				return this.$store.getters.getAuthUser;
			},
			meetups(){
				return this.$store.getters.getAuthUserRegisteredMeetups;
			},
			selfMeetups(){
				return this.$store.getters.getAuthUserSelfMeetups;
			}
		},
		methods: {
	    logout(){
	      this.$store.dispatch('logout');
	      this.$router.push('/');
	    }
		},
		created(){
			this.$store.dispatch('setAuthUserRegisteredMeetups');
			this.$store.dispatch('setAuthUserSelfMeetups');
		}
	}
</script>