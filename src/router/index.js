import Vue from 'vue'
import Router from 'vue-router'
import Personal from "./personal";

Vue.use(Router)



let RouteList = [
  {
    path: '/',
    component: resolve => require(['@/views/layout/App.vue'], resolve),
    meta: {
      title: '首页',
      keepAlive: false,
    },
    children: [

      {
        path: '/',
        name: 'Home',
        meta: {
          title: 'Home',
          keepAlive: true
        },
        component: resolve => require(['@/views/_home/index.vue'], resolve),
      },

      {
        path: '/keyman',
        name: 'Keyman',
        meta: {
          title: '키맨 관리',
          keepAlive: false
        },
        component: resolve => require(['@/views/_keyman/index.vue'], resolve),
      },
      {
        path: '/client',
        name: 'Clinet',
        meta: {
          title: '고객 관리',
          keepAlive: false
        },
        component: resolve => require(['@/views/_client/index.vue'], resolve),
      },
      {
        path: '/sales',
        name: 'Sales',
        meta: {
          title: '영업관리',
          keepAlive: false
        },
        component: resolve => require(['@/views/_sales/index.vue'], resolve),
      },
      {
        path: '/balance',
        name: 'Balance',
        meta: {
          title: '정산관리',
          keepAlive: true
        },
        component: resolve => require(['@/views/_balance/index.vue'], resolve),
      },
      {
        path: '/fc',
        name: 'FC',
        meta: {
          title: 'FC관리',
          keepAlive: true
        },
        component: resolve => require(['@/views/_fc/index.vue'], resolve),
      },
      Personal.index,
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '后台登录',
      keepAlive: false
    },
    components: {
      blank: resolve => require(['@/views/login/Login.vue'], resolve),
    }
  },
]

export default new Router({routes: RouteList})


