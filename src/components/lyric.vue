<template>
  <el-main>
    <div class="lrcPage" :style="{marginTop:marginT+'px'}">
      <ul>
        <li v-for='(i,index) in lrcData' :class="{'highlight':index===idx-1}" :key="i.id">
          {{i}}
        </li>
      </ul>
    </div>
    
  </el-main>
</template>

<script>
import playCtrls from '../App'
import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  methods:{
    
  },
  mounted(){
      if(!this.covFlag){
        this.calMarginT(this)
        this.postData(localStorage.getItem('lrc'),this)
      }
      
  },
  computed:{
    ct(){
      return this.$store.state.current
    },
    covFlag(){
      return this.$store.state.covFlag
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
    playLrc(){
      return this.$store.state.playLrc
    },
    lrcData:{
      get: function () {
        return this.$store.state.lrc
      },
      set: function (newVal) {
        this.$store.state.lrc=newVal
      }
    },
    freshen:{
      get: function () {
        return this.$store.state.freshen
      },
      set: function (newVal) {
        this.$store.state.freshen=newVal
      }
    },
  },
  watch:{
    ct(){
      this.handleTime(this.tarr,this)
    },
    freshen(){
      if(this.freshen){
        // this.freshen=!this.freshen
        // this.$router.push('blankLrc')
        console.log(this.freshen)
      }
    }
  }

}
</script>

<style scoped>
.el-main{
  padding: 0;
}
.lrcPage{
  margin-top:0; 
  transition:marginTop .5s ease;
}
ul{
  list-style-type: none;
}
li{
  height: 20px;
  margin: 10px 0;
  font-size: 1.2rem;
}
.highlight{
  color: #656EFD;
}


</style>
