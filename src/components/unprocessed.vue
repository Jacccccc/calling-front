<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="订单编号"
        sortable
        prop="orderId">
      </el-table-column>
      <el-table-column
        label="创建时间"
        sortable
        prop="createTime">
      </el-table-column>
      <el-table-column
        label="状态"
        prop="state">
      </el-table-column>
      <el-table-column
        width="250px">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            placeholder="输入关键字搜索"/>
        </template>
        <el-button v-bind:type="buttontype">确认入库</el-button>
        <el-button size="mini">忽略</el-button>
        <el-button type="text">详情</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
export default {
  name: 'unprocessed',
  mounted () {
    if (this.$store.state.logged === true) { alert('请登录！'); this.$router.push({path: '/Login'}) }
  },
  data () {
    return {
      search: '',
      buttontype: 'primary',
      tableData: [{
        createTime: '',
        orderId: '',
        state: '',
        coNames: [
          {coName: ''},
          {coName: ''}]
      }]
    }
  }
}
</script>
