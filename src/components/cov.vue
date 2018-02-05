<template>
  <el-main>
    <h3>{{song}}</h3>
    <h4>{{singer}}</h4>
    <div class="disk">
      <div class="circle">
        <div class="circle-inside" :style="{backgroundImage: 'url('+cov+')',animationPlayState:ps?'running':'paused'}">
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import playCtrls from '../App'
export default {
  data () {
    return {
      enlarge:false
    }
  },
  methods:{
  },
  mounted(){
    if(this.showCov){
      this.setStorage(this.song,this.singer,this.cov,this.url,this.lrc)
      playCtrls.methods.playMusic(this.url,this.ps,this.ct,this.iconChange)
    }
    
  },

  computed:{
    ct(){
      return this.$store.state.current
    },
    ps(){
      return this.$store.state.playState
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
    url(){
      return this.$store.state.playUrl||localStorage.getItem('url')
    },
    lrc(){
      return this.$store.state.playLrc||localStorage.getItem('lrc')
    },
    iconChange:{
      get: function () {
        return this.$store.state.iconChange
      },
      set: function (newVal) {
        this.$store.state.iconChange=newVal
      }
    },
    showCov:{
      get: function () {
        return this.$store.state.showCov
      },
      set: function (newVal) {
        this.$store.state.showCov=newVal
      }
    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.disk{
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
.circle{
  /*border:  40px solid ;*/
  border: 1px solid transparent;
  background: linear-gradient(45deg,#1B1B1B 35%,#777676 50%,#1B1B1B 65%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.circle-inside{
  width: 100px;
  height: 100px;
  background: #fff;
  background-size: cover;
  position: relative;
  top:25%;
  left: 25%;
  border: 1px solid transparent;
  border-radius: 50%;
  transform: translate(-50%,-50%);
  transform-origin: 50%,50%;
  animation: spin 10s linear infinite;
  transition: transform .5s;
  transform: scale(1,1);
}
.circle-inside:active{
  transform: scale(2,2);
  animation: none;
}

@keyframes spin{
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
</style>
