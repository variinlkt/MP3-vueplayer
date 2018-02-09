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
  console.log('margint:'+marginT,idx,newct)
  tarr.forEach((val,i)=>{
    if(Math.abs(val-newct)<minv){
      minv=Math.abs(val-newct)
      mini=i
      console.log(minv,mini)
    }
  })
  console.log(minv,mini)
  that.marginT+=(idx-mini)*30
  that.idx=mini
}
Vue.prototype.postData=(url,that)=>{
	let lrc=[],tarr=[]
  axios.post('api/getLrc',{
    lrc:url
  })
  .then(function(response){
    if(response.data){
      let lyric=response.data
      let larr=lyric.split('\n')
      larr.forEach((val,i)=>{
        let t=val.split(']')[0]
        let time=t.split('[')[1]
        let l=val.split(']')[1]

        lrc.push(l)
        
        tarr.push(parseInt(time.split(':')[0])*60+parseFloat(val.split(':')[1]))

        that.lrcData=lrc
        that.tarr=tarr
      })
    }
  })
}//公共方法报错：组件里没comuputed方法内的store的state
Vue.prototype.setStorage=(song,singer,cov,url,lrc)=>{
  if(!localStorage.getItem('song')){//播放第一首
    localStorage.setItem('song',song)
    localStorage.setItem('singer',singer)
    localStorage.setItem('cov',cov)
    localStorage.setItem('url',url)
    localStorage.setItem('lrc',lrc)
  }else{
    if(localStorage.getItem('url')!==url){//播放下一首
      if(url){
        localStorage.setItem('song',song)
        localStorage.setItem('singer',singer)
        localStorage.setItem('cov',cov)
        localStorage.setItem('url',url)
        localStorage.setItem('lrc',lrc)
      }
      
    }
  }
}
Vue.prototype.calMarginT=(that)=>{
	console.log(window.innerHeight)
  that.marginT=parseInt(window.innerHeight)/2-100
}
Vue.prototype.handleTime=(tarr,that)=>{////////////gonggongff
  if(that.ct>=tarr[that.idx]){

    that.marginT-=30
    that.idx++
  }
}