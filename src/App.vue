<template>
  <v-app>
    <v-navigation-drawer app left v-model="sideNav">
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          router
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list> 
    </v-navigation-drawer>
    <v-toolbar app fixed class="teal lighten-3">
      <v-toolbar-side-icon class="hidden-sm-and-up" @click="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link tag="span" to="/" style="cursor: pointer">Meetups</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat 
          v-for="item in menuItems" 
          :key="item.title"
          router
          :to="item.link">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
      menuItems: [
      {icon: 'add_box', title: 'New meetup', link: '/meetups/new'},
      {icon: 'format_list_bulleted', title: 'View meetups', link: '/meetups'},
      {icon: 'supervisor_account', title: 'User', link: '/profile'},
      {icon: 'person_add', title: 'Sign Up', link: '/signup'},
      {icon: 'person', title: 'Sign In', link: '/signin'}
      ]
    }
  },
  name: 'App'
}
</script>
