import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
    	audioName:``,//upload
        lrcName:``,
        covName:``,
        playState:false,//cov
        playSong:``,
        playSinger:``,
        playLrc:``,
        playCov:``,
        playUrl:``,
        playIdx:0,
        current:0,//current time
        duration:0,
        marginT:0,//lyric
        tarr:[],
        idx:0,//
        iconChange:'el-icon-caret-right',
        tableData:[],//songs
        tableLength:0,
        lrc:[],
        covFlag:false,
        freshen:false
    },
    mutations:{
        update(state,info){//duo参数必须是个对象
            state.playSong=info.song
            state.playSinger=info.singer
            state.playCov=info.cov
            state.playLrc=info.lrc
            state.playUrl=info.url
            state.playIdx=info.idx
        },
        init(state){
            state.current=0
            state.marginT=0
            state.tarr=[]
            state.idx=0
            state.lrc=[]
            state.playState=false
        },
    },
})
export default store