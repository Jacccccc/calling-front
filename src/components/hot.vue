<template>
  <div style="width: 60%;margin-left: 20%"
       v-infinite-scroll="moreHot"
       infinite-scroll-immediate="false"
       infinite-scroll-disabled="loading"
  >
  <div v-for="(o,index) in hotPost" :key="index" >
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
    <span v-if="loading === true">暂时没有更多内容了</span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      page: 0,
      hotPost: [[]]
    }
  },
  created () {
    this.moreHot()
  },
  methods: {
    postDetail: function (post) {
      this.$router.push({
        path: `/postDetail?post=` + JSON.stringify(post)
      })
    },
    like: function (post) {
      if (this.common.validateRole('normal') === false) { return }
      if (post.likeState !== '0') { post.likeCounts++; post.likeState = '0' } else { post.likeCounts--; post.likeState = '1' }
      this.common.like(post.post.id, 0)
    },
    moreHot: function () {
      if (this.loading === true) return
      if (this.page > this.hotPost.length) { this.loading = true; return }
      this.common.getHotPostPage(this.hotPost, this.page)
      this.page++
    },
    LikeStatus: function (post) {
      this.common.getLikeStatus(post, post.post.id, 0)
    }
  }
}
</script>
