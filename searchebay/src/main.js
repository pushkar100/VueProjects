// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'

/* Import normalize stylesheet that applies site-wide */
import 'normalize.css';

/* HTTP Requests using Vue Resource(3rd party) */
import VueResource from 'vue-resource'
/* Use vueResource as middleware */
Vue.use(VueResource)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
