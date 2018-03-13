<template>
  <v-alert type="error" dismissible @click="dismiss" :value="true">
    {{ showError }}
  </v-alert>
</template>
<script>
	export default{
		props: ['showError'],
		methods: {
			dismiss(){
				this.$store.dispatch('clearError')
			}
		}
	}
</script>