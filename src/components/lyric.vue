<template>
  <el-main>
    <div class="lrcPage" :style="{marginTop:marginT+'px'}">
      <ul>
        <li v-for='(i,index) in lrc' :class="{'highlight':index===idx-1}" :key="i.id">
          {{i}}
        </li>
      </ul>
    </div>
    
  </el-main>
</template>

<script>
import playCtrls from '../App'
import axios from 'axios'
import store from '../store'
export default {
  data () {
    return {
      lrc:[],
    }
  },
  methods:{
  	postData(url){
  	  let that=this
      axios.post('api/getLrc',{
        lrc:url
      })
      .then(function(response){
        if(response.data){
          
          let lyric=response.data
          let larr=lyric.split('\n')
          for(let val of larr){
            let t=val.split(']')[0]
            let time=t.split('[')[1]
            let l=val.split(']')[1]
            that.lrc.push(l)
            
            that.tarr.push(parseInt(time.split(':')[0])*60+parseFloat(val.split(':')[1]))
          }
        }
      })
  	},
    handleTime(tarr=this.tarr){
      if(this.ct>=tarr[this.idx]){

        this.marginT-=30
        // this.hl='highlight'
        this.idx++
      }
    },
    calMarginT(){
      this.marginT=parseInt(window.innerHeight)/2-100
    }
  },
  mounted(){
  	// console.log(localStorage.getItem('lrc'))
  	this.postData(localStorage.getItem('lrc'))
	  this.calMarginT()
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
  },
  watch:{
    ct:function(){
      this.handleTime(this.tarr)
    }
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
