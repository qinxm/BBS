<template>
  <div>
      <div class="action-container flex" v-if="actions.length">
        <div class="action-item" v-for="(item, index) in actions" :key="index">
          <Button
            :type="item.type || 'default'"
            :disabled="item.disabled"
            :ghost="item.ghost"
            :size="item.size || 'default'"
            :shape="item.shape"
            :loading="item.loading"
            :icon="item.icon"
            :custom-icon="item.customIcon"
            @click="onActionClick(item)">
            {{item.name}}
          </Button>
        </div>
      </div>
      <Table
        :ref="refName"
        :border="tableOptions.border"
        :stripe="tableOptions.stripe"
        :columns="columns"
        :data="data.list"
        :disabled-hover="tableOptions.disabledHover"
        :width="tableOptions.width"
        :height="tableOptions.height"
        :show-header="tableOptions.showHeader"
        :loading="tableOptions.loading"
        :highlight-row="tableOptions.highlightRow"
        :row-class-name="tableOptions.rowClassName"
        :size="tableOptions.size"
        :no-data-text="tableOptions.noDataText || '暂无数据'"
        :no-filtered-data-text="tableOptions.noFilterDataText"
        @on-current-change = "onCurrentChange"
        @on-select-cancel = "onSelectCancel"
        @on-select = "onSelect"
        @on-select-all = "onSelectAll"
        @on-selection-change = "onSelectionChange"
        @on-sort-change = "onSortChange"
        @on-filter-change = "onFilterChange"
        @on-row-click = "onRowClick"
        @on-row-dblclick = "onRowDblclick"
        @on-expand = "onExpand">
      </Table>
      <div v-if="showPage" class="page-container flex" :style="{'justify-content': pageAlign}">
        <Page
          :current="pageOptions.current"
          :total="data.total"
          :page-size="pageOptions.pageSize || pageSizeOpts[0]"
          :page-size-opts="pageOptions.pageSizeOpts || pageSizeOpts"
          :placement="pageOptions.placement"
          :size="pageOptions.size || 'small'"
          :simple="pageOptions.simple"
          :show-total="pageOptions.showTotal===false ? false :true"
          :show-elevator="pageOptions.showElevator===false ? false :true"
          :show-sizer="pageOptions.showSizer===false ? false :true"
          :class-name="pageOptions.className"
          :styles="pageOptions.styles"
          :transfer="pageOptions.transfer"
          :prev-text="pageOptions.prevText"
          :next-text="pageOptions.nextText"
          @on-change="onChange"
          @on-page-size-change="onPageSizeChange">
        </Page>
      </div>
  </div>
</template>

<script>

export default {
  name: 'MyTable',
  props: {
    // 是否显示分页组件
    showPage: {
      type: Boolean,
      default: true
    },

    // 操作列表
    actions: {
      type: Array,
      default: () => [/* {name,disabled,icon,type} */]
    },

    refName: String,

    // 表格配置项
    tableOptions: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 表头
    columns: {
      type: Array,
      default: () => []
    },
    // 数据
    data: {
      type: Object,
      default: () => {
        return {
          list: [],
          total: 0
        }
      }
    },

    // 分页配置项
    pageOptions: {
      type: Object,
      default: function () {
        return {
          // custom prop

          // 分页组件显示位置 合法值'start', 'center', 'end' 对应css flex中的左中右 默认为end 居右显示
          align: 'right'
        }
      }
    }
  },
  computed: {
    pageAlign () {
      let { align } = this.pageOptions
      align = ['start', 'center', 'end'].indexOf(align) > -1 ? align : 'end'
      if (align === 'center') return align
      return 'flex-'.concat(align)
    }
  },
  data () {
    return {
      pageSizeOpts: [10, 20, 50, 100]
    }
  },
  methods: {
    noop () {},

    onActionClick (item) {
      this.$emit('on-action-click', item)
    },

    // 组件事件名称以及回调参数和iview中原组件保持一致

    // table events handler

    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },

    onSelectCancel (slection, row) {
      this.$emit('on-select-cancel', slection, row)
    },

    onSelect (slection, row) {
      this.$emit('on-select', slection, row)
    },

    onSelectAll (slection) {
      this.$emit('on-select-all', slection)
    },

    onSelectionChange (slection) {
      this.$emit('on-selection-change', slection)
    },

    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },

    onFilterChange (column) {
      this.$emit('on-filter-change', column)
    },

    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },

    onRowDblclick (row, index) {
      this.$emit('on-row-click', row, index)
    },

    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    },

    // Page events

    onChange: function (pageNum) {
      this.$emit('on-change', pageNum)
    },

    onPageSizeChange: function (pageSize) {
      this.$emit('on-page-size-change', pageSize)
    }
  }
}
</script>

<style lang="scss" scoped>
  .flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .action-container {
    padding: 6px 0;

    .action-item {
      margin-right: 10px;
    }
  }
  .page-container {
    margin-top: 16px;
  }
</style>
