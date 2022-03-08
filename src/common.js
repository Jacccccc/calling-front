import axios from 'axios'
import store from './store/store'
import {Message} from 'element-ui'

const baseUrl = 'https://calling.fit/api/'
export default {
  Url: function () { return 'http://www.calling.fit:8090/' },
  validateRole: function (role) {
    if (store.state.logged === false) { Message('请先登录'); return false }
    if (store.state.maxRole === 'admin') return true
    if (role === 'editor' && store.state.maxRole === 'normal') { this.$message('您没有权限'); return false }
    if (role === 'admin' && store.state.maxRole !== 'admin') { this.$message('您没有权限'); return false }
  },
  // 获取点赞状态，0代表帖子，1代表评论
  getLikeStatus: function (target, targetId, type) {
    let tail = 'post/likeState'
    if (type === 1) { tail = 'comment/likeState' }
    axios({
      method: 'post',
      url: baseUrl + tail,
      data: {
        id: targetId
      }
    }).then(function (response) {
      target.likeState = response.data.data
    })
  },
  test: function () {

  },
  // 获取热帖
  getHotPostPage: function (hotPost, page) {
    const that = this
    axios({
      method: 'post',
      url: baseUrl + 'post/hot',
      data: {
        'page': page
      }
    }).then(function (response) {
      if (response.data.data.length !== 0) {
        hotPost.push(response.data.data)
        if (store.state.logged === true) { for (let i = 0; i < response.data.data.length; i++) { that.getLikeStatus(response.data.data[i], response.data.data[i].post.id, 0) } }
      }
    })
  },
  // 点赞，0代表帖子，1代表评论
  like: function (targetId, type) {
    let tail = 'post/like'
    if (type === 1) { tail = 'comment/like' }
    axios({
      method: 'post',
      url: baseUrl + tail,
      data: {
        id: targetId
      }
    }).then(function (response) {

    })
  },
  // 发表评论，0代表帖子，1代表评论
  addComment: function (targetId, content, type) {
    let tail = 'post/addComment'
    if (type === 1) { tail = 'comment/addComment' }
    axios({
      method: 'post',
      url: baseUrl + tail,
      data: {
        id: targetId,
        content: content
      }
    }).then(function (response) {
      Message('发表成功')
    })
  },
  // 新帖
  getNewPostPage: function (newPost, lastId, ending) {
    const that = this
    axios({
      method: 'post',
      url: baseUrl + 'post/new',
      data: {
        lastPostId: lastId[0]
      }
    }).then(function (response) {
      if (response.data.data.length !== 0) {
        if (lastId === 0) { that.postAfter(response.data.data[0].post.id, newPost) }
        lastId[0] = response.data.data[response.data.data.length - 1].post.id
        newPost.push(response.data.data)
        if (store.state.logged === true) { for (let i = 0; i < response.data.data.length; i++) { that.getLikeStatus(response.data.data[i], response.data.data[i].post.id, 0) } }
      } else ending[0] = true
    })
  },
  // 帖子的热评
  hotCommentPost: function (page, postId, comment) {
    const that = this
    axios({
      method: 'post',
      url: baseUrl + 'comment/post/hot',
      data: {
        'id': postId,
        'page': page
      }
    }).then(function (response) {
      if (response.data.data.length !== 0) {
        console.log(response.data.data)
        comment.push(response.data.data)
        if (store.state.logged === true) { for (let i = 0; i < response.data.data.length; i++) { that.getLikeStatus(response.data.data[i], response.data.data[i].commentVo.id, 1) } }
      }
    })
  },
  // 帖子的新评论
  newCommentPost: function (lastCommentId, postId, comment) {
    const that = this
    axios({
      method: 'post',
      url: baseUrl + 'comment/post/new',
      data: {
        'id': postId,
        'lastCommentId': lastCommentId[0]
      }
    }).then(function (response) {
      if (response.data.data.length !== 0) {
        if (lastCommentId[0] === 0) { that.postCommentAfter(response.data.data[0].commentVo.id, comment) }
        lastCommentId[0] = response.data.data[response.data.data.length - 1].commentVo.id
        comment.push(response.data.data)
        if (store.state.logged === true) { for (let i = 0; i < response.data.data.length; i++) { that.getLikeStatus(response.data.data[i], response.data.data[i].commentVo.id, 1) } }
      }
    })
  },
  // 帖子的评论，按时间顺序
  newCommentC: function (lastCommentId, commentId) {
    const that = this
    axios({
      method: 'post',
      url: baseUrl + 'comment/comment/new',
      data: {
        'id': commentId,
        'lastCommentId': lastCommentId
      }
    }).then(function (response) {
      that.comment.push(response.data.data)
    })
  },
  // 帖子的内容
  postContent: function (postId, data) {
    axios({
      method: 'post',
      url: baseUrl + 'post/detail',
      data: {
        'id': postId
      }
    }).then(function (response) {
      data.push(response.data.data)
    })
  },
  // 获取评论的目标的用户，比如获取被评论的评论的发评论用户
  commentTarget: function (targetId) {
    axios({
      method: 'post',
      url: baseUrl + 'comment/target',
      data: {
        'id': targetId
      }
    }).then(function (response) {
      return response.data.data
    })
  },
  // 获取用户信息
  getUserInfo: function () {
    const that = this
    axios({
      method: 'post',
      url: baseUrl + 'user/userInfo'
    }).then(function (response) {
      that.userInfo.push(response.data.data)
    })
  },
  modifyName: function (name) {
    const that = this
    axios({
      method: 'post',
      url: baseUrl + 'user/modifyName'
    }).then(function (response) {
      that.userInfo.push(response.data.data)
    })
  },
  postAfter: function (id, post) {
    axios({
      method: 'post',
      url: baseUrl + 'post/newAfter'
    }).then(function (response) {
      post.unshift(response.data.data)
    })
  },
  postCommentAfter: function (id, comment) {
    axios({
      method: 'post',
      url: baseUrl + 'comment/newAfter',
      data: {
        'id': id
      }
    }).then(function (response) {
      comment.unshift(response.data.data)
    })
  }
}
