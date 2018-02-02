<template>
  <div id="app">
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="4">
            <router-link to="/songs">
              <el-menu-item index="1">我的歌单</el-menu-item>
            </router-link>
          </el-col>
          <el-col :span="4" class="center">
            {{playing}}
          </el-col>
          <el-col :span="4">
          </el-col>
        </el-row>
      </el-menu>
    </el-header>

    <router-view></router-view>
    
    <el-footer>
      <audio id="audi"></audio>
      <div class="block">
        <el-slider v-model="ct" :max="d" :format-tooltip="toAudiFormat" :step="0.1" @change="sliderChange1(ct)"></el-slider>{{ct|toAudiFormat}}/{{d|toAudiFormat}}
      </div>
      <el-button-group>
        <router-link to="add">
          <el-button icon="el-icon-circle-plus"></el-button>
        </router-link>

        <el-button type="primary" icon="el-icon-d-arrow-left"></el-button>
        <el-button type="primary" :icon="iconChange" @click="changeState();playMusic();"></el-button>
        <el-button type="primary" icon="el-icon-d-arrow-right"></el-button>
        <router-link to="lrc">
          <el-button icon="el-icon-tickets"></el-button>
        </router-link>
      </el-button-group>
    </el-footer>
  </div>
</template>

<script>
import cov from './components/cov'
import lycCtrl from './components/lyric'
import {mapState,mapMutations} from 'vuex'
import store from './store'
export default {
  name: 'app',
  data(){
    return{
      val:0,
      // songSrc:''
      lrcName:this.$store.state.playLrc,
      checkd:0
    }
  },
  methods:{
    ...mapMutations([
      'changeState','currentT','updateDur'
    ]),
    // ...mapMutations({
    //   change: 'changeState' // 将 `this.change()` 映射为 `this.$store.commit('changeState')`
    // }),
    playMusic(url=localStorage.getItem('url'),ps=this.ps,ct=this.ct,icon=this.iconChange,callback=this.update){
      let audi=document.getElementById('audi')
      audi.setAttribute("crossOrigin","anonymous")
      // console.log(audi.duration)
      // this.updateDur()
      if(!audi.src){
        audi.setAttribute("src",url) 
        audi.load()
      }
      audi.ondurationchange=()=>{//ondurationchange在事件循环最后执行
        store.commit("updateDur",audi.duration)
      }
      if(ps) {  
        icon='el-icon-error'////////////
        audi.play();  
      } else {  

        icon='el-icon-caret-right'
        audi.pause();  
      } 
      if(ct!==audi.currentTime){
        audi.currentTime=ct
      }
    },
    sliderChange1(value){
      let audi = document.getElementById('audi')
      if(value!==audi.currentTime){
        audi.currentTime=value
      }
      this.sliderChange(this.ct,this.tarr,this.marginT,this.idx,this)
    },
    toAudiFormat(val){
      let h,m,s
      function addZero(v){
        return v<10?`0${v}`:`${v}`
      }
      if(Math.floor(val/3600)){//hours
        h=Math.floor(val/3600)
        let theRest=val%3600
        m=Math.floor(theRest/60)
        s=theRest%60
        s=Math.floor(s)
        h=addZero(h)
        m=addZero(m)
        s=addZero(s)
        return `${h}:${m}:${s}`
      }
      else if(Math.floor(val/60)){//mins
        m=Math.floor(val/60)
        s=val%60
      }
      else {
        m=0
        s=val
      }
        
      s=Math.floor(s)
      m=addZero(m)
      s=addZero(s)
      return `${m}:${s}`
    },
  },
  computed:{
    ps(){
        return this.$store.state.playState
    },
    ct:{
      get: function () {
        return this.$store.state.current
      },
      set: function (newVal) {
        this.$store.state.current=newVal
      }
    },
    d(){
      return this.$store.state.duration
    },
    playing(){
      return this.$store.state.playSong
    },
    marginT:{
      get: function () {
        return this.$store.state.marginT
      },
      set: function (newVal) {
        this.$store.state.marginT=newVal
      }
    },
    tarr(){
      return this.$store.state.tarr
    },
    idx:{
      get: function () {
        return this.$store.state.idx
      },
      set: function (newVal) {
        this.$store.state.idx=newVal
      }
    },
    iconChange:{
      get: function () {
        return this.$store.state.iconChange
      },
      set: function (newVal) {
        this.$store.state.iconChange=newVal
      }
    },
  },
  watch:{
    ct:function(){
      // lycCtrl.methods.handleTime()
    }
  },
  mounted(){
    let audi = document.getElementById('audi');
    audi.ontimeupdate=()=>{
      store.commit("currentT",{t:audi.currentTime})
    };
  },
  filters:{
    toAudiFormat(val){
      let h,m,s
      function addZero(v){
        return v<10?`0${v}`:`${v}`
      }
      if(Math.floor(val/3600)){//hours
        h=Math.floor(val/3600)
        let theRest=val%3600
        m=Math.floor(theRest/60)
        s=theRest%60
        s=Math.floor(s)
        h=addZero(h)
        m=addZero(m)
        s=addZero(s)
        return `${h}:${m}:${s}`
      }
      else if(Math.floor(val/60)){//mins
        m=Math.floor(val/60)
        s=val%60
      }
      else {
        m=0
        s=val
      }
        
      s=Math.floor(s)
      m=addZero(m)
      s=addZero(s)
      return `${m}:${s}`
    },
    
  }
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  width: 100%;
  height: 100%;
}
.el-header{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  z-index: 10;
  padding: 0;
}

.el-footer{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #D4D1D1;
  height: 150px !important;
  padding-top: 40px;
  background: #fff;
}
.block-slider{
  width: 100%;
}
.el-slider{
  width: 80%;
  margin: 0 auto;
}
.el-slider__input{
  display: none;
}
.el-button-group{
  margin-top: 5px;
}
.center{
  color:#1D8CF9;
  font-size: 1.2rem;
  padding: 20px 0 0 10px;
  white-space: nowrap;
}
</style>
