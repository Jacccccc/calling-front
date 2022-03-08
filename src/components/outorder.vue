<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%" >
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-table>
          <el-table-column label="商品名" prop="props.row."></el-table-column>
          <el-table-column label="商品ID"></el-table-column>
          <el-table-column label="数量"></el-table-column>
          <el-table-column label="单价"></el-table-column>
          <el-table-column label="合计"></el-table-column>
        </el-table>
      </template></el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="订单编号" sortable prop="orderId">
      </el-table-column>
      <el-table-column label="创建时间" sortable prop="createTime">
      </el-table-column>
      <el-table-column label="状态" prop="state">
      </el-table-column>
      <el-table-column width="250px">
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
  mounted () {
    if (this.$store.state.logged === true) { alert('请登录！'); this.$router.push({path: '/Login'}) }
  },
  name: 'outorder',
  data () {
    return {
      search: '',
      buttontype: 'primary',
      tableData: [{
        createTime: '04-11 19:01',
        orderId: '12345678',
        state: '未处理',
        coNames: [
          {coName: 'o0'},
          {coName: 'j0'}]
      }]
    }
  },
  methods: {
    add: function () {
      this.tableData.push({
        createTime: '04-11 19:00',
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      })
    }
  }
}
</script>
