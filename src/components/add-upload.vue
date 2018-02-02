<template>
  <el-main>
    <h3>歌曲上传</h3>
    <el-upload class="upload-demo" action="/api/uploadFiles" drag :on-preview="handlePreview"  :on-change="uploadSuc"
      :on-remove="handleRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList" :before-upload="filesUpload" ref="upload">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传歌曲文件、封面、歌词</em></div>
      <div slot="tip" class="el-upload__tip">歌曲、封面、歌词文件命名需相同且为歌名</div>
      <div slot="tip" class="el-upload__tip">文件类型需分别为mp3、jpg、lrc</div>

    </el-upload>
  </el-main>
  
</template>

<script>
export default {
  data () {
    return {
      fileList: [],
    }
  },
  methods:{
    filesUpload(file){
console.log(file);
      let isFileName=file.name.split('.')[0]===sessionStorage.getItem('songUpload')
      let isFileType=file.name.split('.')[1]==='mp3'||file.name.split('.')[1]==='jpg'||file.name.split('.')[1]==='lrc'||file.name.split('.')[1]==='txt'
      if(!isFileName){
        this.$message.error('上传文件名称与表单提交的名称不同！请修改文件名称');
      } 
      if(!isFileType){
        this.$message.error('上传文件类型只能是mp3、jpg、lrc');
      } 

      return isFileName&&isFileType
    },
    uploadSuc(file){
      // let isLrcFile
      // console.log("name"+file.name)
      //   let fileType=file.name.split('.')[1]==='lrc'?isLrcFile=true:isLrcFile=false
      //   // console.log(file.name+" "+fileType)
      //   if(window.FileReader && isLrcFile) {  
      //       var fr = new FileReader();  
      //       console.log('good')
      //       // fr.onloadend = function(e) {  
      //       //   console.log(e.target.result)//如果ok就把它存入数据库
      //       // };  
      //       fr.readAsText(file);  
      //       console.log(result)
      //   }  
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handlePictureCardPreview(){

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
