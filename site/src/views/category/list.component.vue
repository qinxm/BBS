<template>
  <section>
    <page-table @doQuery="doQuery" @doClear="doClear">
      <template slot="queryButtons">
        <Button type="primary" class="mgr10" @click="addCategory">新增</Button>
      </template>
      <Form slot="queryForm" ref="queryForm" :model="params" inline :label-width="100" class="query-form">
        <FormItem label="分类名称:">
          <Input type="text" v-model.trim="params.orderNo" clearable placeholder="请输入分类名称"></Input>
        </FormItem>
      </Form>
      <div slot="table">
        <mfb-data-list showPage 
        :data="dataList" 
        :columns="columns" 
        :table-options="tableOptions" 
        :pageOptions="pageOptions"
        @on-change="changePageNum" 
        @on-page-size-change="changePageSize"></mfb-data-list>
      </div>
    </page-table>
    <create v-if="showAdd" :show="showAdd"  @close="closeAddCategory"></create>
  </section>
</template>

<script>
import { getColumns } from "./list.config.js"
import services from '@/config/services'
import Create from './create.component.vue'
export default {
  name: "CategoryList",
  components: {
    Create
  },
  data() {
    return {
      showAdd: false,
      params: {
        pageNum: 1,
        pageSize: 10,
      },
      columns: getColumns(this),
      tableOptions: { border: true },
      pageOptions: {},
      dataList: {
        list: []
      },
    };
  },
  created() {
    
  },
  methods: {
    doQuery() {
      this.params.pageNum = 1
      this.getList()
    },
    doClear() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
      }
    },
    async getList() {
      // let newParams = deleteKey(this.params)
      let res = await services.getCategoryList(this.params)
      if (!this.$error(res)) return
      this.dataList = {
        total: res.result.count,
        list: res.result.list
      }
      // this.pageOptions.current = res.result.current
    },
    addCategory() {
      console.log('add')
      this.showAdd = true
    },
    closeAddCategory() {
      this.showAdd = false
      this.getList()
    },
    async getEnumListFun() {
      // 3:资产类型  4:资产状态
      let res = await getEnumList({type: ['7', '8']})
      if (!this.$error(res)) return
      this.businessTypeOptions = res.result["7"]
      this.orderStatusOptions = res.result["8"]
    },
    // 页码变化
    changePageNum(pageNum) {
      this.params.pageNum = pageNum
      this.getList()
    },
    // 每页显示多少变化
    changePageSize(pageSize) {
      this.params.pageNum = 1
      this.params.pageSize = pageSize
      this.getList()
    },
    // 详情页
    toDetail(row, id) {
      this.$router.push({
        name: 'inStoragePlanDetail',
        params: {
          id,
          fromName: this.$route.name
        }
      })
    },
  }
};
</script>