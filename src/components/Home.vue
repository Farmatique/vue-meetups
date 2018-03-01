<template>
	<div>
		<v-layout row >
			<v-carousel>
		    <v-carousel-item 
		    	v-for="meetup in meetups" 
		    	:src="meetup.imageUrl" 
		    	:key="meetup.id"
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
		data(){
			return{
				meetups: [
					{ imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/1201044_original_%281%29.jpg', id:'fgdgdsfsdf', title: 'Meetup at Dnipro' },
					{ imageUrl: 'https://farm8.staticflickr.com/7387/13333327953_26bc37001e_k.jpg', id:'fgdgdsfsdfjjggc', title: 'Meetup at Kiev' }
				]
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