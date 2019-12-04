import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import echarts from 'echarts'
import '@/styles/index.scss' // global css
import '@/styles/custom.scss' //自定义样式

import App from './App'
import store from './store'
import router from './router'
import Calendar from 'vue2-datepick'; //日期控件
import '@/icons' // icon
import '@/permission' // permission control
import vshare from 'vshare' //分享组件
import MintUI from 'mint-ui';  //这是把所有组件导入进来
import 'mint-ui/lib/style.css'
//将 MintUI 安装到 Vue 上
Vue.use(MintUI);  //把所有组件注册为全局组件

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }
//var vshare = require('vshare')

Vue.use(vshare)
Vue.use(Calendar)
// set ElementUI lang to EN
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
