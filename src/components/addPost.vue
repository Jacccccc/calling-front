<template>
  <div style="width: 60%;margin-left: 20%">
<div >
  <el-input v-model="title" placeholder="请输入标题">
    <template slot="append"><el-button type="primary" @click="addPost">发表</el-button></template>
  </el-input>
</div>
    <div>在此为帖子添加标签
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+标签</el-button>
    </div>
  <div>
    <el-input
      type="textarea"
      :autosize="{ minRows: 20, maxRows: 40}"
      placeholder="请输入内容"
      v-model="content">
    </el-input>
  </div>
  </div>
</template>
<style>
/* 利用穿透，设置input边框隐藏 */
.inputDeep>>>.el-input__inner {
  border: 0;
}
/* 如果你的 el-input type 设置成textarea ，就要用这个了 */
.inputDeep>>>.el-textarea__inner {
  border: 0;
  resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
}
</style>
<script>
export default {
  name: 'addPost',
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      title: '',
      content: ''
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    addPost () {
      const that = this
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/post/add',
        data: {
          title: this.title,
          content: this.content,
          tags: this.dynamicTags
        }
      }).then(function (response) {
        console.log(0)
        if (response.data.code === 0) { that.$message('发表成功'); that.$router.push('/new') }
      }
      )
    }
  }
}
</script>

<style scoped>

</style>
