<template>
  <div >
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">请登录</h3>
      <el-form-item label="邮箱" prop="email">
        <el-input type="text" placeholder="请输入账号" v-model="form.email"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item prop="code" label="验证码" >
        <span>
        <el-input  type="text" placeholder="请输入验证码(点击图片刷新)" v-model="form.code" /></span>
        <span style="align-items: center"> <img :src="codePic" alt="验证码" width="200px" @click="getCode()"/></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-bind:loading="load"  v-on:click="onSubmit('loginForm')" style="margin-right: 10px">登录</el-button>
        <router-link to="/register"><el-button type="primary" style="margin-right: 60px">注册</el-button></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data () {
    return {
      load: false,
      codePic: 'https://www.calling.fit/api/' + 'utils/kaptcha',
      realCode: '',
      form: {
        email: '',
        password: '',
        code: ''
      },
      // 表单验证，需要再el-form-item 元素中增加prop属性
      rules: {
        email: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
        code: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    getCode: function () {
      this.codePic = ''
      this.codePic = 'https://www.calling.fit/api/' + 'utils/kaptcha?' + Math.random()
    },
    onSubmit: function () {
      const that = this
      if (this.form.code === '' || this.form.email === '' || this.form.password === '') return
      this.axios({
        method: 'get',
        url: 'https://www.calling.fit/api/' + 'utils/logincode'
      }).then(function (response) {
        if (response.data.code === 0) {
          if (response.data.data === that.form.code) {
            that.axios({
              method: 'post',
              url: 'https://www.calling.fit/api/' + 'user/login',
              data: {
                'email': that.form.email.replace('@', '.'),
                'passWord': that.form.password
              }
            }).then(function (response) {
              that.load = false
              if (response.data.code === 0) { console.log(response.data.data); sessionStorage.setItem('jwt', response.data.data.jwt); sessionStorage.setItem('refresh', response.data.data.refresh); that.$store.commit('setUserName', response.data.data.userName); that.$store.commit('setMaxRole', response.data.data.maxRole); that.$store.commit('setAvatar', response.data.data.avatar); that.$message('登录成功'); that.$router.push({path: '/hot'}) } else { that.$message(response.data.msg) }
            })
          } else this.$message('验证码错误')
        } else this.$message(response.data.msg)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box{
  border: 1px solid #DCDFE6;
  width: 350px;
  margin:175px auto;
  margin-top: 20px ;
  margin-bottom: 20px;
  padding:35px 35px 15px 35px;
  border-radius: 2px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow:0 0 25px #909399;
}

.login-title{
  text-align:center;
  margin:0 auto 40px auto;
  color:#303133;
}
</style>
