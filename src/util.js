import axios from 'axios'
export default{
// let lrc=[],tarr=[]
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

        that.lrcData.push(l)
        
        that.tarr.push(parseInt(time.split(':')[0])*60+parseFloat(val.split(':')[1]))

        // that.lrcData=lrc
        // that.tarr=tarr
      })
    }
  })
}