<template>
	<el-main>
		<table>
			<tr v-for="(value,index) in tableData" @click="init();update({song:tableData[index].song,url:tableData[index].url,lrc:tableData[index].lrc,singer:tableData[index].singer,cov:tableData[index].cov,idx:tableData[index].idx});routerTo('cov')">
				<td>{{index+1}}</td>
				<td><img :src="tableData[index].cov" alt=""></td>
				<td v-for="td in value" v-html="td">
				</td>
				<td >
					<!-- <transition-group name="fade"> -->
					<i class="el-icon-delete" @click.stop="tableData[index].confirm=!tableData[index].confirm" v-show="!tableData[index].confirm"></i>
					<el-button type="danger" @click.stop="deleteSong(tableData[index].song,tableData[index].cov,tableData[index].url,tableData[index].lrc)" v-show="tableData[index].confirm">删除</el-button>
					<el-button @click.stop="tableData[index].confirm=!tableData[index].confirm" v-show="tableData[index].confirm">取消</el-button>
				<!-- </transition-group> -->
				</td>
			</tr>
		</table>
	</el-main>
</template>
<script>
import axios from 'axios'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods:{
  	...mapMutations([
  		'update','init'
  	]),
  	routerTo(url){
  		this.$router.push({name:url})
  	},
  	// playSong(s,u,l,sr,c){
  	// 	this.$router.push({name:`cov`,params:{name:s,url:u,lrc:l,singer:sr,cov:c}})
  	// },
  	loadFromDatabase(){
  		let that=this
  		axios.get('/api/showList')
		  .then(function (response) {
		    let tableArr=[]

		    response.data.forEach((i,idx)=>{
		    	let tableObj={}
		    	
			    tableObj.cov='../server/'+i.cov.replace(/\\/g,'/')
			    tableObj.song=i.song
			    tableObj.singer=i.singer
			    tableObj.url='../server/'+i.url.replace(/\\/g,'/')
			    tableObj.lrc='../server/'+i.lrc.replace(/\\/g,'/')//!!!!!!!!!!!11
			    tableObj.idx=idx
			    tableObj.confirm=false
			    tableArr.push(tableObj)
		    })
		    that.tableData=tableArr
		    that.tableLength=tableArr.length
		  })
		  .catch(function (error) {
		    console.error(error);
		  });

  	},
  	deleteSong(s,c,u,l){
  		let that=this
  		
  		axios.post('api/delete',{
  			song:s,
  			cov:c.split('/')[3],
  			url:u.split('/')[3],
  			lrc:l.split('/')[3]

  		})
		.then(function(response){
			if(response.data){
				console.log('okok')
				that.$router.push('blank')
			}
				
		})
  	}
  },
  mounted(){//页面加载完成
  	return this.loadFromDatabase()
  },
  computed:{
  	tableData:{
      get: function () {
        return this.$store.state.tableData
      },
      set: function (newVal) {
        this.$store.state.tableData=newVal
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
  }
  
}

</script>
<style scoped>
	.el-main{
		padding: 0;
		width: 100%;
		overflow: hidden;
	}
	table{
		border-collapse: collapse;/*行能显示边框*/
		width: 100%;
		overflow: hidden;
		table-layout: fixed;/*表格显示省略号*/
	}
	tr{
		height: 100px ;
		border-bottom: 1px solid #C4C0C0;
		overflow: hidden;
		width: 100%;
	}
	td{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	tr>td:nth-child(1){
		
		width: 5%;
	}
	tr>td:nth-child(2){
		
		width: 25%;
	}
	tr>td:nth-child(3){
		
		width: 0;
	}
	tr>td:nth-child(4){
		
		width: 30%;
	}
	tr>td:nth-child(5){
		
		width: 25%;
	}
	tr>td:nth-child(6){
		
		width: 0;
	}
	tr>td:nth-child(7){
		
		width: 0;
	}
	tr>td:nth-child(8){
		
		width: 0;
	}
	tr>td:nth-child(9){
		
		width: 0;
	}
	tr>td:nth-child(10){
		
		width: 15%;
	}
	img{
		width: 100px;
		height: 100px;
		margin: 10px 0;
	}
	.el-icon-delete{
		font-size: 25px;
	}
</style>