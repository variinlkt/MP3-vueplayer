import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
    	
        playState:true,
        playSong:``,
        playSinger:``,
        playLrc:``,
        playCov:``,
        playUrl:``,
        current:0,
        duration:1,
        marginT:0,
        tarr:[],
        idx:0,
        iconChange:'el-icon-caret-right',
    },
    mutations:{
        
        changeState(state){
            state.playState=!state.playState
        },
        update(state,info){//duo参数必须是个对象
            state.playSong=info.song
            state.playSinger=info.singer
            state.playCov=info.cov
            state.playLrc=info.lrc
            state.playUrl=info.url
        },
        currentT(state,time){
            state.current=time.t
        },
        updateDur(state,dur){
            state.duration=dur
        }
    },
    actions:{
    	
		
    }
})
export default store