<template>
  <section class="view welcome-view">
    <div class="welcome__feed"> 
      <Scroll :on-reach-bottom="handleReachBottom" :height="contentHeight">
        <ul class="entry-list">
          <li class="item" v-for="(item) in entryList" :key="item.id">
            <post-item :item="item" @afterChangeLike="refresh(item)"></post-item>
          </li>
        </ul>
      </Scroll>
    </div>
    <aside class="welcome__side">
      <tags></tags>
    </aside>
  </section>
</template>
<script>
import PostItem from  '@/components/page/postItem.component.vue'
import services from '@/config/services'
export default {
  name: 'Home',
  components: {
    PostItem
  },
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 10
      },
      entryList: [],
      // 总页数
      pages: 0,
      contentHeight: document.documentElement.clientHeight - 100
    }
  },
  created() {
    this.getPostList()
  },
  mounted() {
    window.onresize = () => {
      this.contentHeight = document.documentElement.clientHeight - 100
    }
  },
  methods: {
    refresh(item) {
      item.liketimes = item.liketimes + 1
      // this.getPostList()
    },
    async getPostList() {
      let res = await services.getPostList(this.params)
      if(!this.$error(res)) return
      this.pages = res.result.pages
      this.entryList = [...this.entryList, ...res.result.list] 
      this.entryList.map((item) => {
        if(item.tags) {
          if (typeof item.tags == 'string') {
            item.tags = item.tags.replace('，', ',')
            item.tags = item.tags.split(',')
          }
        }
        return item
      })
    },
    handleReachBottom() {
      if (this.pages > this.params.pageNum) {
        this.params.pageNum = this.params.pageNum+1
        this.getPostList()
      }
      else {
        console.log('已到底了')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  
  .welcome-view {
    display: flex;
    align-items: flex-start;
    .welcome__feed {
      overflow: hidden;
      flex: 1,
    }
    .welcome__side {
      width: 240px;
      min-width: 240px;
      margin-left: 20px;
    }
  }
 
  
</style>

