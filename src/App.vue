<template>
  <div id="app">
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="8">
            <router-link to="/songs">
              <el-menu-item index="1">我的歌单</el-menu-item>
            </router-link>
          </el-col>
          <el-col :span="8" class="center">
            {{playing}}
          </el-col>
          <el-col :span="8">
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
      <el-row>
        <el-col :span="6" :xs="0" class="loopCtrl">
          <el-switch v-model="isLoop" active-text="循环" inactive-text="顺序">
          </el-switch>
        </el-col> 
        <el-col :span="12" :xs="24">
          <el-button-group>
            <router-link to="add">
              <el-button icon="el-icon-circle-plus"></el-button>
            </router-link>
            <el-button type="primary" @click="init();changeSong('pre')" icon="el-icon-d-arrow-left"></el-button>
            <el-button type="primary" :icon="iconChange" @click="playMusic();"></el-button>
            <el-button type="primary" @click="init();changeSong('next')" icon="el-icon-d-arrow-right"></el-button>
            <el-button icon="el-icon-tickets" @click="showLrcPage"></el-button>
          </el-button-group>
        </el-col> 
        <el-col :span="6" class="volCtrl" :xs="12">
          <div class="volIcon">
            <i class="el-icon-service"></i>
          </div>
          <el-slider v-model="volume" class="volBar" @change="setVol"></el-slider>
        </el-col> 
        <el-col :sm="0" :md="0" :lg="0" :xl="0" :xs="12">
          <el-switch v-model="isLoop" active-text="循环" inactive-text="顺序">
          </el-switch>
        </el-col> 
      </el-row>
      
    </el-footer>
  </div>
</template>

<script>
import cov from './components/cov'
import lycCtrl from './components/lyric'
import {mapState,mapMutations} from 'vuex'
import store from './store'
import axios from 'axios'
export default {
  name: 'app',
  data(){
    return{
      val:0,
      // songSrc:''
      lrcName:this.$store.state.playLrc,
      checkd:0,
      isLoop:false,
      volume:100,
      showLrc:true
    }
  },
  methods:{
    ...mapMutations([
      'init'
    ]),
    // ...mapMutations({
    //   change: 'changeState' // 将 `this.change()` 映射为 `this.$store.commit('changeState')`
    // }),
    playMusic(url=localStorage.getItem('url'),that=this){
      let audi=document.getElementById('audi')
      audi.setAttribute("crossOrigin","anonymous")
      audi.setAttribute("src","")
      audi.setAttribute("src",url) 
      audi.load()
      audi.ondurationchange=()=>{//ondurationchange在事件循环最后执行
        that.d=audi.duration
      }

      if(!that.ps) {  //play
        that.iconChange='el-icon-error'
        audi.play()
      } else {  //pause
        that.iconChange='el-icon-caret-right'
        audi.pause()
      } 
      if(that.ct!==audi.currentTime){//暂停时更改播放位置，否则相对于停止
        audi.currentTime=that.ct
      }
      that.ps=!that.ps
    },
    sliderChange1(value){
      let audi = document.getElementById('audi')
      if(value!==audi.currentTime){//更改进度
        audi.currentTime=value
      }
      this.sliderChange(this.ct,this.tarr,this.marginT,this.idx)
    },
    sliderChange(newct,tarr,marginT,idx){
      let minv=10000,mini
      tarr.forEach((val,i)=>{
        if(Math.abs(val-newct)<minv){
          minv=Math.abs(val-newct)
          mini=i
        }
      })
      this.marginT+=(idx-mini)*30
      this.idx=mini
    },
    setVol(){
      let audi = document.getElementById('audi')
      audi.volume=this.volume/100
    },
    changeSong(s){
      let audi = document.getElementById('audi')
      audi.setAttribute("src","") 
      let i=this.playIdx
      if(s==='next'){
        i++
        if(i===this.tableLength)
          i=0
      }
      else if(s==='pre'){
        i--
        if(i<0)
          i=this.tableLength-1
      }
      else i=s
      store.commit('update',{
        song:this.tableData[i].song,
        singer:this.tableData[i].singer,
        cov:this.tableData[i].cov,
        lrc:this.tableData[i].lrc,
        url:this.tableData[i].url,
        idx:this.tableData[i].idx
      })

      this.setStorage(this.song,this.singer,this.cov,this.url,this.lrc)
      this.playMusic(this.url)
      this.calMarginT(this)
      this.postData(localStorage.getItem('lrc'),this)

    },
    showLrcPage(){
      if(this.showLrc==true){
        this.showLrc=!this.showLrc
        this.$router.push('lrc')
      }else{
        this.showLrc=!this.showLrc
        this.$router.go(-1)
      }
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
    ps:{
      get: function () {
        return this.$store.state.playState
      },
      set: function (newVal) {
        this.$store.state.playState=newVal
      }
    },
    ct:{
      get: function () {
        return this.$store.state.current
      },
      set: function (newVal) {
        this.$store.state.current=newVal
      }
    },
    d:{
      get: function () {
        return this.$store.state.duration
      },
      set: function (newVal) {
        this.$store.state.duration=newVal
      }
    },
    playing(){
      return this.$store.state.playSong
    },
    url(){
      return this.$store.state.playUrl
    },
    marginT:{
      get: function () {
        return this.$store.state.marginT
      },
      set: function (newVal) {
        this.$store.state.marginT=newVal
      }
    },
    tarr:{
      get: function () {
        return this.$store.state.tarr
      },
      set: function (newVal) {
        this.$store.state.tarr=newVal
      }
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
    tableData(){
      return this.$store.state.tableData
    },
    playIdx:{
      get: function () {
        return this.$store.state.playIdx
      },
      set: function (newVal) {
        this.$store.state.playIdx=newVal
      }
    },
    tableLength:{
      get: function () {
        return this.$store.state.tableLength
      },
      set: function (newVal) {
        this.$store.state.tableLength=newVal
      }
    },
    singer(){
      return this.$store.state.playSinger||localStorage.getItem('singer')
    },
    song(){
      return this.$store.state.playSong||localStorage.getItem('song')
    },
    cov(){
      return this.$store.state.playCov||localStorage.getItem('cov')
    },
    lrc(){
      return this.$store.state.playLrc||localStorage.getItem('lrc')
    },
    freshen:{
      get: function () {
        return this.$store.state.freshen
      },
      set: function (newVal) {
        this.$store.state.freshen=newVal
      }
    },
    lrcData:{
      get: function () {
        return this.$store.state.lrc
      },
      set: function (newVal) {
        this.$store.state.lrc=newVal
      }
    },
    currentT:{
      get: function () {
        return this.$store.state.current
      },
      set: function (newVal) {
        this.$store.state.current=newVal
      }
    },
  },
  watch:{
    ct(){
      let audi = document.getElementById('audi')
      if(audi.ended){
        if(!this.isLoop){
          store.commit('init')
          this.changeSong('next')
          this.freshen=!this.freshen
        }
      }
      this.handleTime(this.tarr,this)
    },
    isLoop(){
      let audi = document.getElementById('audi')
      audi.loop=this.isLoop
    }
  },
  mounted(){
    let audi = document.getElementById('audi');
    audi.ontimeupdate=()=>{
      this.currentT=audi.currentTime
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
  padding:10px 5px;
  background: #fff;
}
.el-row{
  width: 100%;
  margin-top: 10px;
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
.el-button{
  font-size: .7rem;
  padding: .8rem;
}
.center{
  color:#1D8CF9;
  font-size: 1.2rem;
  padding: 20px 0 0 10px;
  white-space: nowrap;
}
/*.volumnCtrl{

}*/
.loopCtrl{
  padding: 10px 0;
}
.el-switch__label>span{
  font-size: .7rem !important;
}
.el-switch__core{
  width: 25px !important;
}
.volCtrl{
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}
.volIcon{
  width: 20%;
  padding: 10px 0;
}
.volBar{
  width: 70%;
}

.el-icon-service{
  font-size: 1.2rem;
  margin-top: -5px; 

}
</style>
