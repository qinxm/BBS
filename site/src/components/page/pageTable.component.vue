<template>
  <section class="page-container">

    <card class="query-panel">
      <slot name="queryForm">

      </slot>

      <div class="query-buttons">
        <slot name="queryButtons">

        </slot>
        <Button type="primary" icon="ios-search" class="mgr10" @click="doQuery">查询</Button>
        <Button type="primary" icon="md-refresh" class="" @click="doClear">清空查询条件</Button>
      </div>
    </card>

    <card class="mgt20">
      <slot name="table">
      </slot>
    </card>
  </section>
</template>

<script>
export default {
  props: {

  },
  methods: {
    doQuery () {
      this.$emit('doQuery')
    },
    doClear () {
      this.$emit('doClear')
    }
  }
}
</script>
<style lang="scss">
.mgr10{margin-right: 10px;}
</style>
