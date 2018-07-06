import Vue from 'vue'
import Router from 'vue-router'
import store from '@/plugins/store.js'

import Home from '@/components/Home'
import NotFoundView from '@/components/404.vue'

import ChangePass from '@/components/auth/ChgPwd'
import Signin from '@/components/auth/Index'
import Signup from '@/components/auth/Register'

// Frontend
import Dashboard from '@/components/frontoffice/dashboard/Dashboard'

import VitaboxDetail from '@/components/frontoffice/vitabox/VitaboxDetail'

import BoardDetail from '@/components/frontoffice/board/BoardDetail'

import PatientDetail from '@/components/frontoffice/patient/PatientDetail'
import AlertList from '@/components/frontoffice/alerts/AlertList'

import UserDetail from '@/components/frontoffice/user/UserDetail'

// Backend
import VitaboxList from '@/components/backoffice/vitabox/VitaboxList'
import VitaboxRegister from '@/components/backoffice/vitabox/VitaboxRegister'
import UserList from '@/components/backoffice/users/UserList'
import Boardmodel from '@/components/backoffice/boardmodel/BoardmodelList'
import Sensormodel from '@/components/backoffice/sensormodel/SensormodelList'
import Profilemodel from '@/components/backoffice/profile/ProfileList'
import Utils from '@/components/backoffice/utils/utils'
import BoardDashboard from '@/components/backoffice/board/BoardDetails'
import PatientDashboard from '@/components/backoffice/patient/PatientDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      // beforeEnter: requireAuth
    },
    {
      path: '/vitabox/detail',
      name: 'VitaboxDetail',
      component: VitaboxDetail,
      // beforeEnter: requireAuth
    },
    {
      path: '/board/detail',
      name: 'BoardDetail',
      component: BoardDetail,
      // beforeEnter: requireAuth
    },
    {
      path: '/patient/detail',
      name: 'PatientDetail',
      component: PatientDetail,
      // beforeEnter: requireAuth
    },
    {
      path: '/alerts/list',
      name: 'AlertList',
      component: AlertList,
      // beforeEnter: requireAuth
    },
    {
      path: '/user/detail',
      name: 'UserDetail',
      component: UserDetail,
      // beforeEnter: requireAuth
    },
    {
      path: '/user/changepass',
      name: 'ChangePass',
      component: ChangePass,
      // beforeEnter: requireAuth
    },

    // backoffice
    {
      path: '/backoffice/vitabox/list',
      name: 'VitaboxList',
      component: VitaboxList
    },
    {
      path: '/backoffice/vitabox/register',
      name: 'VitaboxRegister',
      component: VitaboxRegister
    },
    {
      path: '/backoffice/user',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/backoffice/boardmodel',
      name: 'Boardmodel',
      component: Boardmodel
    },
    {
      path: '/backoffice/sensormodel',
      name: 'Sensormodel',
      component: Sensormodel
    },
    {
      path: '/backoffice/profilemodel',
      name: 'Profilemodel',
      component: Profilemodel
    },
    {
      path: '/backoffice/utils',
      name: 'Utils',
      component: Utils
    },
    {
      path: '/backoffice/dashboard/board',
      name: 'BoardDashboard',
      component: BoardDashboard,
      props: true
    },
    {
      path: '/backoffice/dashboard/patient',
      name: 'PatientDashboard',
      component: PatientDashboard,
      props: true
    },
    // not found handler
    {
      path: '*',
      component: NotFoundView
    }
  ]
})
