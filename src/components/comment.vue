<template>
  <div  style="width: 60%;text-align: center;margin-left: 20%">
    <div style="text-align: left">
      <span><el-avatar :src="comment.commentVo.userVo.avatar" height="10px" width="10px"/></span>
      <span style="margin-left: 10px">{{comment.commentVo.userVo.userName}}</span>
      <span style="margin-left: 50px">发表于({{comment.commentVo.createTime}})</span>
    </div>
    <div style="text-align: left">
      <span>{{comment.commentVo.content}}</span>
    </div>
    <div style="float: left">
          <span @click="likeCo(comment)" >
        <img  src="static/pic/unlike.png" v-if="comment.likeState !=='0'" height="20" width="20">
        <img src="static/pic/like.png" v-else height="20" width="20" >
        ({{comment.likeCounts}})</span>
      <span v-on:click="reply(this.comment)"><img src="static/pic/comment.png" width="20" height="20" style="margin-left: 20px">
        ({{comment.commentCounts}})</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      comment: {},
      content: ''
    }
  },
  created () {
    let comment = this.$route.query.comment
    this.comment = JSON.parse(comment)
  },
  methods: {
    likeCo: function (comment) {
      if (this.common.validateRole('normal') === false) { return }
      if (comment.likeState !== '0') { comment.likeCounts++; comment.likeState = '0' } else { comment.likeCounts--; comment.likeState = '1' }
      this.common.like(comment.commentVo.id, 1)
    },
    reply: function (comment) {
      if (this.content.length === 0) { this.$message('内容不能为空'); return }
      this.common.addComment(comment.commentVo.id, this.content, 1)
    }
  }
}
</script>

<style scoped>

</style>
