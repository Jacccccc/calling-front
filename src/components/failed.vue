<template>
<p>登录失败</p>
</template>

<script>
export default {
  mounted () {
    if (this.$store.state.logged === true) this.$router.push({path: '/Login'})
    else this.$router.push({path: '/mainpage'})
  },
  name: 'failed'
}
</script>

<style scoped>

</style>
