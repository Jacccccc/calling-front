import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import register from '../components/register'
import hot from '../components/hot'
import failed from '../components/failed'
import info from '../components/info'
import postTail from '../components/postTail'
import addPost from '../components/addPost'
import searchPost from '../components/searchPost'
import newPost from '../components/new'
import comment from '../components/comment'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'hot',
      component: hot
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/hot',
      name: 'hot',
      component: hot
    },
    {
      path: '/failed',
      name: 'failed',
      component: failed
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/postDetail',
      name: 'postDetail',
      component: postTail
    },
    {
      path: '/addPost',
      name: 'addPost',
      component: addPost
    },
    {
      path: '/search',
      name: 'searchPost',
      component: searchPost
    },
    {
      path: '/new',
      name: 'new',
      component: newPost
    },
    {
      path: '/comment',
      name: 'comment',
      component: comment
    }
  ]
})
