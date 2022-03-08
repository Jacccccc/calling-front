<template>
  <el-container>
    <el-header height="10%">
      <el-row :gutter="20" >
        <el-col :span="2"><div> <el-image src="static/pic/img.png" style="height: 5%;margin-left: 5%"></el-image></div></el-col>
        <el-col :span="5" style="margin-left: 5%"><el-tabs  style="margin-top:15%">
          <el-link :underline="false" style="font-size: 20px;color: #c6e2fe" @click="()=>{this.$router.push('/hot')}">最热</el-link>
          <el-link :underline="false" style="font-size: 20px;color: #c6e2fe;margin-left: 5%"  @click="()=>{this.$router.push('/new')}">最新</el-link>
          <el-link :underline="false" style="font-size: 20px;color: #c6e2fe;margin-left: 5%" @click="()=>{this.$router.push('/addPost')}">我要发帖</el-link>
        </el-tabs></el-col>
        <el-col :span="10">
        <el-input v-model="searchText" placeholder="请输入搜索内容" size="small" style="margin-top: 10%;margin-left:5%;border-radius: 20px;width: 50%"></el-input>
          <el-button size="small"  icon="el-icon-search" style="border-radius: 20px;background-color: #c6e2fe" @click="search()">搜索</el-button>
        </el-col>
        <div>
          <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" v-on:click="login" style="height: 60px;border-radius: 50%;margin-top: 2%;margin-left: 5%"/>
        </div>
      </el-row>
    </el-header>
    <el-main style="height: 60%" ><router-view></router-view></el-main>
    <el-footer style="text-align: center">
      <div>本网站部分资源来自互联网，如有侵权请联系作者:jacllovey@qq.com   </div>
      <div>@calling 2022<el-link href="https://beian.miit.gov.cn/" style="margin-left: 10px">蜀ICP备2022003368号</el-link></div>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  created () {
    if (sessionStorage.getItem('store')) { this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store')))) }
    window.addEventListener('beforeunload', () => { sessionStorage.setItem('store', JSON.stringify(this.$store.state)) })
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    login: function () {
      if (this.$store.state.logged === false) this.$router.push({path: '/login'})
      else {
        this.$router.push({path: '/info'})
      }
    },
    search: function () {
      this.$router.push('/search?tags=' + this.searchText)
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.night{
  background-color: #2c3e50;
}
</style>
