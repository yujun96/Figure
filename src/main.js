import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'


import 'common/stylus/index.styl'

// 解决移动端300ms延迟
fastclick.attach(document.body);

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
