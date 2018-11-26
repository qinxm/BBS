<template>
  <section>
    <Card>
      <p slot="title">
        热门标签
      </p>
      <a href="#" slot="extra" @click.prevent="toTagsPage" class="tag-link">
        查看全部
      </a>
      <div class="content tag-list">
        <a v-for="(tag,index) in tags" :key="index" target="_blank" class="tag">
          {{tag}}
        </a>
      </div>
    </Card>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tags: ["架构","前端","产品", "Java"]
    }
  },
  methods: {
    toTagsPage() {
      console.log('tags')
    }
  }
}
</script>
<style lang="scss" scoped>
  .tag-list {
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .tag {
      margin-right: 12px;
      margin-bottom: 12px;
      background-color: #f3f6f3;
      cursor: pointer;
      height: 30px;
      color: inherit;
      line-height: 30px;
      padding-left: 22px;
      padding-right: 22px;
      border-radius: 30px;
      font-size: 1rem;
    }
    
  }
  .tag-link {
      font-size: 1rem;
      color: #007fff;
    }
</style>
