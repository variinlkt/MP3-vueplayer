import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

import reg from '@/components/reg'
import songs from '@/components/songs'
import add from '@/components/add'
import addUpload from '@/components/add-upload'
import lyric from '@/components/lyric'
import blank from '@/components/blank'
import cov from '@/components/cov'
import blankLrc from '@/components/blankLrc'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: songs,
    },
    {
    	path:'/reg',
    	name:'reg',
    	component:reg,
    },
    {
      path:'/songs',
      name:'songs',
      component:songs,
      // meta: {
      //       requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      //   },
    },
    {
      path:'/add',
      name:'add',
      component:add,
    },{
      path:'/cov',
      name:'cov',
      component:cov,
    },
    {
      path:'/add-upload',
      name:'add-upload',
      component:addUpload,
    },
    {
      path:'/blank',
      name:'blank',
      component:blank,
    },
    {
      path:'/lrc',
      name:'lrc',
      component:lyric
    },
    {
      path:'/blankLrc',
      name:'blankLrc',
      component:blankLrc,
    }
  ]
})
