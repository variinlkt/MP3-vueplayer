<template>
	<el-main>
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="用户名" prop="name">
		    <el-input v-model="ruleForm2.name" name="name"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" name="psw"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
		    <el-button @click="resetForm('ruleForm2')">重置</el-button>
        <router-link to="reg">
          <el-button type="primary"  plain>我要注册<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </router-link>
        
		  </el-form-item>
		</el-form>
	</el-main>
</template>
<script>
	import axios from 'axios';
	export default {
    data() {
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
        	if(value.length<6)  callback(new Error('密码需大于6位'));
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
     
      var validateName=(rule,value,callback)=>{
      	if(value === ''){
      		return callback(new Error('请输入用户名'))
      	}else{
      		if(!/^\w{6,16}$/.test(value)){
      			return callback(new Error("用户名格式错误：应大于6位小于16位且由下划线英文数字组成"))
      		}
      	}
  	     axios.post('/api/nameCheck', {
    		    name: this.ruleForm2.name
    		  })
    		  .then(function (response) {
            // console.log(response.data);
    		    if(!response.data){
              return callback()
            }
    		    else return callback(new Error('该用户名不存在'));
    		  })
    		  .catch(function (error) {
    		    console.log(error);
    		  });
	      	
	      };
      return {
        ruleForm2: {
          name:'',
          pass: '',
          checkPass: '',
          email: ''
        },
        rules2: {
          name:[
            { validator:validateName,trigger:'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          
        }
      };
    },
    methods: {
      submitForm(formName) {
        var that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            axios.post('/api/logSub',{
            	name:this.ruleForm2.name,
            	psw:this.ruleForm2.pass,
            }).then(function(response){
              if(response.data){
                that.$message('登录成功，正在跳转界面...')
                sessionStorage.setItem('user',that.ruleForm2.name)
                // that.$store.dispath('login')
                console.log(sessionStorage.getItem('user'))
                return that.$router.push({path:'songs'})
              }
            	return that.$notify.error({
		          title: '错误',
		          message: '登录失败，请重试',
		          duration:0
		        });
            })
          } else {
            console.log('error submit!!');
            that.$notify.error({
		          title: '错误',
		          message: '请正确填入信息',
		          duration:0
		        });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
	
</style>