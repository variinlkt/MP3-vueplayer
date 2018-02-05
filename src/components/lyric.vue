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
    calMarginT(){
      this.marginT=parseInt(window.innerHeight)/2-100
    },
    postData(url){
      let lrc=[],tarr=[]
      let that=this
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
        that.sliderChange(that.ct,that.tarr,that.marginT,that.idx,that)
      })
        
      
    }
  },
  mounted(){
  	// console.log(localStorage.getItem('lrc'))
    let that=this
    if(this.showCov){

      this.calMarginT(this)
      this.showCov=!this.showCov
      this.postData(localStorage.getItem('lrc'))

    }
    else
  	  this.sliderChange(this.ct,this.tarr,this.marginT,this.idx,this)
  },
  computed:{
    ct(){
      return this.$store.state.current
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
    showCov:{
      get: function () {
        return this.$store.state.showCov
      },
      set: function (newVal) {
        this.$store.state.showCov=newVal
      }
    },
  },
  watch:{
    ct(){
      this.handleTime(this.tarr,this)
    },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.lrcPage{
  overflow-y: hidden;
}*/
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
