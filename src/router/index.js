import Vue from 'vue'
import Router from 'vue-router'
import appComponent from '@/components/appComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'appComponent',
      component: appComponent
    }
  ]
})
