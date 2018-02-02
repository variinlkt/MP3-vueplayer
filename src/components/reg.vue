<template>
	<el-main>
		<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="用户名" prop="name">
		    <el-input v-model="ruleForm2.name" name="name"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" name="psw"></el-input>
		  </el-form-item>
		  <el-form-item label="确认密码" prop="checkPass">
		    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="注册邮箱" prop="email">
		    <el-input v-model="ruleForm2.email" name="email"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
		    <el-button @click="resetForm('ruleForm2')">重置</el-button>
        <router-link to="login">
          <el-button type="primary"  plain  icon="el-icon-arrow-left">我要登录</el-button>
        </router-link>

        
		  </el-form-item>
		</el-form>
	</el-main>

</template>
<script>
	import axios from 'axios';
	export default {
    data() {
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }

    	if(!/^\w+@\w+\.\w+$/.test(value)){
    		return callback(new Error('请输入正确的邮箱格式'));
    	}
    	callback();
      };
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
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
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
              return callback(new Error('用户名已存在'))
            }
    		    else return callback();
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
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        var that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('ok')
            axios.post('api/regSub',{
            	name:this.ruleForm2.name,
            	psw:this.ruleForm2.pass,
            	email:this.ruleForm2.email
            }).then(function(response){
              if(response.data){
                that.$message('注册成功，正在跳转登录界面...')
                return that.$router.push({path:'/login'})
              }
            	return that.$notify.error({
                title: '错误',
                message: '注册失败',
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