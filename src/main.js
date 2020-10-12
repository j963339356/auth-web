import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import App from './App.vue'
import router from './router'
import store from './store'

import '@/styles/index.scss'

import '@/permission' //页面载入权限

Vue.use(ElementUI,{locale});
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
