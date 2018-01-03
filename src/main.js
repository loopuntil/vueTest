// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DataTables from 'vue-data-tables'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import axios from 'axios'
import VueAxios from 'vue-axios'
import service from './service'
// 使用自定義的service，在這個case只是hook，其實無實際作用
Vue.use(service)
// 使用axios
Vue.use(VueAxios, axios)
// 關閉開發階段的提示訊息
Vue.config.productionTip = false
// http://element.eleme.io/#/en-US/component/quickstart
Vue.use(ElementUI)
// https://njleonzhang.github.io/vue-data-tables/#/quickstart
Vue.use(DataTables)
locale.use(lang)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
