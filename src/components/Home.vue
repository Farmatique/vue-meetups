<template>
	<div>
		<v-layout row>
			<v-flex xs12 v-if="loading" class="text-xs-center">
				<v-progress-circular 
					indeterminate 
					color="red"
					:size="70"
					:width="2"
					>
				</v-progress-circular>
			</v-flex>
		</v-layout>
		<v-layout row v-if="!loading">
			<v-carousel>
		    <v-carousel-item 
		    	v-for="meetup in meetups" 
		    	:src="meetup.imageUrl" 
		    	:key="meetup.id"
		    	style="cursor: pointer"
		    	@click.native="goToMeetup(meetup.id)"
		    >
					<div class="title text-xs-center py-3">{{ meetup.title }}</div>
	    	</v-carousel-item>
		  </v-carousel>
		</v-layout>
		<v-layout row wrap class="mt-2">
			<v-flex xs12 sm6 class="text-sm-right text-xs-center">
				<v-btn large router to="/meetups/new" class="primary">Create New Meetup</v-btn>
			</v-flex>
			<v-flex xs12 sm6 class="text-sm-left text-xs-center">
				<v-btn large router to="/meetups" class="info">Check Meetups</v-btn>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	export default {
		computed: {
			meetups(){
				return this.$store.getters.featuredMeetups
			},
			loading(){
				return this.$store.getters.isLoading
			}
		},
		methods: {
			goToMeetup(id){
				this.$router.push('meetups/' + id)
			}
		}
	}
</script>

<style scoped>
	.title{
		left: 0;
		right: 0;
		position: absolute;
		bottom: 50px;
		color: #fff;
		background-color: rgba(0,0,0,.5);
	}
</style>