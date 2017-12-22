// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-easytable/libs/themes-base/index.css'
import DataTables from 'vue-data-tables'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import axios from 'axios'
import VueAxios from 'vue-axios'
import service from './service'

Vue.use(service)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(DataTables)
locale.use(lang)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
