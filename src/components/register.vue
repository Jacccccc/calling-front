<template>
  <div>
    <el-form  :model="form" :rules="rules" label-width="80px" class="register-box">
      <h3 class="register-title">注册</h3>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" placeholder="请输入用户名" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" placeholder="请确认密码" v-model="form.checkPass"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" placeholder="请输入邮箱" v-model="form.email"/>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <span>
        <el-input type="text" placeholder="点击发送邮件验证码" v-model="form.code" style="width: 195px"/>
        <el-button type="primary" v-on:click="sendCode()" >发送</el-button></span>
      </el-form-item>
      <el-form-item style="margin-left: 70px">
        <el-button type="primary" v-on:click="onSubmit('loginForm')" style="margin-right: 70px">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pass: false,
      form: {
        username: '',
        password: '',
        email: '',
        phone: '',
        checkPass: '',
        code: ''
      },
      rules: {
        username: [
          {required: true, message: '昵称不能为空', trigger: 'blur'}
        ],
        password: [
          { validator: validatePass, trigger: 'blur' },
          {required: true, message: '', trigger: 'blur'}
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur', require: true },
          {required: true, message: '', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    sendCode: function () {
      const that = this
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.form.email === '' && !regEmail.test(this.form.email)) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
        })
        this.form.email = ''
        return
      }
      this.axios({
        method: 'get',
        url: 'https://calling.fit/api/utils/sendEmail?email=' + this.form.email
      }).then(function (response) {
        if (response.data.code === 0) { that.$message('已经发送') } else that.$message(response.data.msg)
      })
    },
    onSubmit: function () {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (this.form.email === '' || !regEmail.test(this.form.email)) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
        })
        this.form.email = ''
        return
      }
      if (this.form.password !== this.form.checkPass) { this.$message('两次密码不一致'); return }
      if (this.form.password === null) { this.$message('请输入密码'); return }
      if (this.form.username === null) { this.$message('请输入用户名'); return }
      const that = this
      this.axios({
        method: 'get',
        url: 'https://calling.fit/api/utils/validate?code=' + this.form.code
      }).then(function (response) {
        if (response.data.code !== 0) { that.$message(response.data.msg) } else that.pass = true
      })
      if (this.pass === false) return
      this.axios({
        method: 'post',
        url: 'https://calling.fit/api/user/register',
        data: {
          userName: this.form.username,
          email: this.form.email.replace('@', '.'),
          password: this.form.password
        }
      }).then(function (response) {
        if (response.data.code === 0) {
          that.$message('注册成功，请登录')
          that.$router.push({path: '/Login'})
        } else that.$message(response.data.msg)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.register-box{
  border: 1px solid #DCDFE6;
  width: 350px;
  margin:51px auto;
  padding:35px 35px 15px 35px;
  border-radius: 2px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow:0 0 25px #909399;
}

.register-title{
  text-align:center;
  margin:0 auto 40px auto;
  color:#303133;
}
</style>
