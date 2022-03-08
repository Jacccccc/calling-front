<template>
  <div style="width: 60%;margin-left: 20%">
    <div id="postTitle" style="font-size: 40px">
      {{post.post.title}}
    </div>
        <div id="posHead" style="align-content: center">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span style="margin-left: 10px">{{post.post.user.userName}}</span>
          <span style="margin-left: 50px">发表于({{post.post.createTime}})</span>
        </div>
    <div id="postContent">
      {{content[0]}}
    </div>
    <div style="margin-top: 10px;">
     <span @click="like(post)">
        <img  src="static/pic/unlike.png" v-if="post.likeState!=='0'" height="20" width="20">
        <img src="static/pic/like.png" v-else height="20" width="20" >
        点赞({{post.likeCounts}})</span>
      <span ><img src="static/pic/comment.png" width="20" height="20" style="margin-left: 20px">
        评论({{post.commentCounts}})</span>
      <el-popover
        placement="right"
        width="160"
        v-model="visible">
        <div> <el-button type="text" @click="switchTo(true)">最热</el-button></div>
        <div ><el-button type="text" @click="switchTo(false)">最新</el-button></div>
        <el-button type="text" slot="reference">{{hotOrNew}}</el-button>
      </el-popover>
      <el-button @click="editComment" type="primary" style="margin-left: 400px;">
        发表评论
      </el-button>

      <el-drawer
        :visible.sync="drawer"
        :direction="direction">
        请输入内容:<el-input v-model="mycomment"></el-input>
        <el-button style="align-self: center" type="primary" @click="sendComment()">发表</el-button>
      </el-drawer>
    </div>
    <div id="comment" v-for="(o,index) in realComment" :key="index"
         v-infinite-scroll="moreComment"
         infinite-scroll-immediate="false"
         infinite-scroll-disabled="disable"
    >
      <div v-for="(k,index) in o" :key="index" style="margin-top: 10px">
        <div>
        <span><el-avatar :src="k.commentVo.userVo.avatar" height="10px" width="10px"/></span>
        <span style="margin-left: 10px">{{k.commentVo.userVo.userName}}</span>
          <span style="margin-left: 50px">发表于({{k.commentVo.createTime}})</span>
        </div>
        <div>
        <span>{{k.commentVo.content}}</span>
        </div>
        <div>
          <span @click="likeCo(k)" >
        <img  src="static/pic/unlike.png" v-if="k.likeState !=='0'" height="20" width="20">
        <img src="static/pic/like.png" v-else height="20" width="20" >
        ({{k.likeCounts}})</span>
          <span @click="commentDetail(k)"><img src="static/pic/comment.png" width="20" height="20" style="margin-left: 20px">
        ({{k.commentCounts}})</span>
        </div>
      </div>
    </div>
    <span v-if="loading === true">加载中</span>
    <span v-else-if="ending === true">暂时没有更多了，尝试刷新试试</span>
     </div>
</template>

<script>

export default {
  name: 'postTail',
  data () {
    return {
      loading: false,
      visible: false,
      ending: false,
      hotOrNew: '最热',
      mycomment: '',
      isHot: true,
      drawer: false,
      lastCommentId: [0],
      lastLast: [-1],
      page: 0,
      direction: 'ltr',
      post: {

      },
      content: [],
      realComment: [[]],
      comment: [[]],
      newCo: [[]],
      reqTime: 0
    }
  },
  computed: {
    disable () {
      return this.ending || this.loading
    }
  },
  created () {
    let post = this.$route.query.post
    this.post = JSON.parse(post)
    this.common.postContent(this.post.post.id, this.content)
    this.realComment = this.comment
    this.moreComment()
  },
  methods: {
    commentDetail: function (k) {
      this.$router.push('/comment?comment=' + JSON.stringify(k))
    },
    editComment: function () {
      if (this.common.validateRole('normal') === false) { return }
      this.drawer = true
    },
    sendComment: function () {
      if (this.mycomment.length === 0) { this.$message('内容不能为空'); return }
      this.post.commentCounts++
      this.common.addComment(this.post.post.id, this.mycomment, 0)
      this.drawer = false
      this.mycomment = ''
    },
    like: function (post) {
      if (this.common.validateRole('normal') === false) { return }
      if (post.likeState !== '0') { post.likeCounts++; post.likeState = '0' } else { post.likeCounts--; post.likeState = '1' }
      this.common.like(post.post.id, 0)
    },
    likeCo: function (comment) {
      if (this.common.validateRole('normal') === false) { return }
      if (comment.likeState !== '0') { comment.likeCounts++; comment.likeState = '0' } else { comment.likeCounts--; comment.likeState = '1' }
      this.common.like(comment.commentVo.id, 1)
    },
    newComment: function () {
      if (this.lastCommentId[0] === this.lastLast[0]) { this.ending = true; return }
      this.lastLast[0] = this.lastCommentId[0]
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
      this.common.newCommentPost(this.lastCommentId, this.post.post.id, this.newCo)
    },
    hotComment: function () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
      if (this.page === this.comment.length) { this.ending = true; this.$message('暂时没有更多了'); return }
      this.common.hotCommentPost(this.page, this.post.post.id, this.comment)
      this.page++
    },
    moreComment: function () {
      if (this.isHot === true) { this.hotComment() } else this.newComment()
    },
    switchTo: function (bool) {
      this.loading = false
      this.visible = false
      this.ending = false
      if (bool === true) { this.realComment = this.comment; this.hotOrNew = '最热' } else { this.realComment = this.newCo; this.hotOrNew = '最新' }
      this.isHot = bool
      this.moreComment()
    }
  }
}
</script>

<style scoped>

</style>
