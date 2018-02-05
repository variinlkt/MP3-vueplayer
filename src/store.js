import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
    	audioName:``,
        lrcName:``,
        covName:``,
        playState:true,
        playSong:``,
        playSinger:``,
        playLrc:``,
        playCov:``,
        playUrl:``,
        playIdx:0,
        current:0,
        duration:0,
        marginT:0,
        tarr:[],
        idx:0,
        iconChange:'el-icon-caret-right',
        tableData:[],
        tableLength:0,
        lrc:[],
        showCov:true
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
            state.playIdx=info.idx
        },
        currentT(state,time){
            state.current=time.t
        },
        updateDur(state,dur){
            state.duration=dur
        },
        init(state){
            state.current=0
            state.marginT=0
            state.tarr=[]
            state.idx=0
            state.lrc=[]
        },
        addCT(state){
            state.current+=0.3
        }
    },
    actions:{
    	
		
    }
})
export default store