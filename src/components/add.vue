<template>
  <el-main>
    <el-form :model="info" ref="info" status-icon :rules="rules" label-width="50px" class="demo-ruleForm">
      <el-form-item label="歌名" prop="song">
        <el-input v-model="info.song" auto-complete="off" name="song"></el-input>
      </el-form-item>
      <el-form-item label="歌手" prop="singer">
        <el-input v-model="info.singer" auto-complete="off" name="singer"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('info')">提交</el-button>
        <el-button @click="resetForm('info')">重置</el-button>
      </el-form-item>
    </el-form>
    
  </el-main>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    var checkInput = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('该项不能为空'));
      }
      if(/[#_%'/",;:=!^<>]+/.test(value)){
        return callback(new Error('包含非法字符'));
      }
      
      callback();
    };
    return {
      rules:{
        song:[
          { validator:checkInput,trigger:'blur' }
        ],
        singer: [
          { validator: checkInput, trigger: 'blur' }
        ]

      },
      info:{
        song: '',
        singer:''
      },
    }
  },
  methods:{
    submitForm(formName) {
      let that=this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/uploadInfo', {
            song: this.info.song,
            singer:this.info.singer,
          })
          .then(function (response) {
            if(response.data){
              sessionStorage.setItem('songUpload',that.info.song)
              localStorage.setItem('unfinished',true)//如果在提交表单后未上传文件前退出
              that.$router.push({path:'add-upload'})
              return that.$message.success(`提交成功！请上传文件`);
            }else{
              return that.$message.error(`歌单中已有相同名字文件或数据库错误！请尝试修改文件名`)
            }
          })
          .catch(function (error) {
            console.error(error);
          });
        } else {
          console.error('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('../assets/css/index.css');
.el-upload,.upload-demo{
  margin: 20px 0;
}
</style>
