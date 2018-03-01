import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetups/Meetups'
import NewMeetup from '@/components/Meetups/NewMeetup'
import SignUp from '@/components/User/SignUp'
import SignIn from '@/components/User/SignIn'
import UserProfile from '@/components/User/UserProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetups/new',
      name: 'NewMeetup',
      component: NewMeetup
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile
    }
  ],
  mode: 'history'
})
