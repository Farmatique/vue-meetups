<template>
  <v-app>
    <v-toolbar fixed class="teal lighten-3">
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>Meetups</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>add_box</v-icon>
          New meetup
        </v-btn>
        <v-btn flat>
          <v-icon left>format_list_bulleted
</v-icon>
          View meetups
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer left v-model="sideNav">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>add_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>New meetup</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>format_list_bulleted</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>View meetups</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <main>
      
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  name: 'App'
}
</script>
