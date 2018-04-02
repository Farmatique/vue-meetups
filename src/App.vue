<template>
  <v-app>
    <v-navigation-drawer temporary app left v-model="sideNav">
      <v-list >
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
        <v-list-tile v-if="isUserAuthenticated" @click="logout">
          <v-list-tile-action>
            <v-icon>transfer_within_a_station</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list> 
    </v-navigation-drawer>
    <v-toolbar app fixed class="headerColor">
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
        <v-btn v-if="isUserAuthenticated" flat @click="logout">
          <v-icon left>transfer_within_a_station</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content class="background">
      <transition 
        name="fade" 
        mode="out-in" 
        appear
        appear-active-class="appear-custom-active"
        appear-to-class="appear-custom-to">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems(){
      let MenuItems = [
        {icon: 'person_add', title: 'Sign Up', link: '/signup'},
        {icon: 'person', title: 'Sign In', link: '/signin'}
      ]
      if(this.$store.getters.isUserAuthenticated){
        MenuItems = [
          {icon: 'add_box', title: 'New meetup', link: '/meetups/new'},
          {icon: 'format_list_bulleted', title: 'View meetups', link: '/meetups'},
          {icon: 'supervisor_account', title: 'User', link: '/profile'}
        ]
      }
      return MenuItems;
    },
    isUserAuthenticated(){
      return this.$store.getters.isUserAuthenticated;
    }
  },
  methods: {  
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  },
  name: 'App'
}
</script>

<style>
  .alert.error{
    background-color: #ff5252 !important;
    border-color: #ff5252 !important;
  }

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .fade-enter{
    opacity: 0;
    -webkit-transition: .3s all ease-in;
    -o-transition: .3s all ease-in;
    transition: .3s all ease-in;
  }
  .fade-enter-active{
    opacity: 1;
    -webkit-transition: .3s all ease-in;
    -o-transition: .3s all ease-in;
    transition: .3s all ease-in;
  }
  .fade-leave-to{
    opacity: 0;
    -webkit-transition: .3s all ease-in;
    -o-transition: .3s all ease-in;
    transition: .3s all ease-in;
  }
  .appear-custom-active{
    transform: scale(0);
    -webkit-transition: .5s all ease-in;
    -o-transition: .5s all ease-in;
    transition: .5s all ease-in;
  }
  .appear-custom-to{
    transform: scale(1);
    -webkit-transition: .5s all ease-in;
    -o-transition: .5s all ease-in;
    transition: .5s all ease-in;
  }
</style>
