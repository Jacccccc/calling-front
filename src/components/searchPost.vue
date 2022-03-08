<template>
  <div style="width: 60%;margin-left: 20%">
    搜索结果如下:
    <div v-for="(o,index) in post" :key="index" >
      <div v-for="(k,index) in o" :key="index" style="margin-top: 20px;border-top: solid 1px #c6e2fe">
        <div id="posHead" style="align-content: center">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span style="margin-left: 10px">{{k.post.user.userName}}</span>
          <span style="margin-left: 50px">发表于({{k.post.createTime}})</span>
        </div>
        <div id="postTitle" v-on:click="postDetail(k)">
          {{k.post.title}}
        </div>
        <div id="postFoot">
        <span @click="like(k)">
        <img  src="static/pic/unlike.png" v-if="k.likeState!=='0'" height="20" width="20">
        <img src="static/pic/like.png" v-else height="20" width="20" >
        点赞({{k.likeCounts}})</span>
          <span v-on:click="postDetail(k)"><img src="static/pic/comment.png" width="20" height="20" style="margin-left: 20px">
        评论({{k.commentCounts}})</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    if (this.$store.state.logged === false) { this.$router.push('/login') }
  },
  created () {
    let searchText = this.$route.query.tags
    let tags = searchText.split(' ')
    let ans = []
    for (let i = 0; i < tags.length; i++) { if (tags[i] !== '') ans.push(tags[i]) }
    const that = this
    console.log(ans)
    this.axios({
      method: 'post',
      url: 'http://localhost:8090/searchPost',
      data: {
        tags: ans
      }
    }).then(function (response) {
      that.ids = response.data.data
      console.log(response.data.data)
      if (response.data.data !== null) {
        that.axios({
          method: 'post',
          url: 'https://www.calling.fit/api/post/idsPost',
          data: {
            ids: that.ids
          }
        }).then(function (response) {
          that.post.push(response.data.data)
          console.log(that.post)
        })
      } else { that.$message('没有内容') }
    })
  },
  name: 'searchPost',
  data () {
    return {
      ids: [],
      post: [[]]
    }
  },
  methods: {
    likeState: function (id) {
      this.axios({
        method: 'post',
        url: 'https://www.calling.fit/api/post/likestate',
        data: {
          id: id
        }
      }).then(function (response) {
        return response.data.data
      })
    },
    postDetail: function (post) {
      this.$router.push({
        path: `/postDetail?post=` + JSON.stringify(post)
      })
    }
  }
}
</script>

<style scoped>

</style>
