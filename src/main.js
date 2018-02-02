// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import Vuex from 'vuex'

import axios from 'axios';

import store from './store'

Vue.prototype.$axios = axios;

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
   store, //注入到vue
})
Vue.prototype.sliderChange=(newct,tarr,marginT,idx,that)=>{
  let minv=10000,mini
  tarr.forEach((val,i)=>{
    if(Math.abs(val-newct)<minv){
      minv=Math.abs(val-newct)
      mini=i
    }
  })
  that.marginT+=(idx-mini)*30
  that.idx=mini///////////fuzhishibai,传个this进来
  console.log(mini,idx)
  console.log(marginT)
}
