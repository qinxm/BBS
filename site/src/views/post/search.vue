<template>
  <section class="view">
    <div class="search-content main-area shadow">
      <Scroll v-if="entryList.length" :on-reach-bottom="handleReachBottom" :height="contentHeight">
        <ul class="entry-list">
          <li class="item" v-for="item in entryList" :key="item.id">
            <post-item :item="item"></post-item>
            <!-- <div class="entry">
              <a> 
                <div class="content-box">
                  <div class="info-box">
                    <div class="info-row meta-row">
                      <ul class="meta-list">
                        <li class="item username">
                          <a> {{item.author}}</a>
                        </li>
                        <li class="item">
                          <span> {{item.publishtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
                        </li>
                        <li class="item">
                          <router-link class="tag" v-for="(tag, tagIndex) in item.tags" :key="tagIndex"  :to="{name: 'user', params: {id: tag}}"> 
                            {{tag}}
                          </router-link>
                        </li>
                      </ul>
                    </div>
                    <div class="info-row title-row">
                      <router-link :to="{name: 'postDetail', params: {id: item.pid}}"  class="title">
                        {{item.title}}
                      </router-link>
                    </div>
                    <div class="info-row action-row">
                      <ul class="action-list">
                        <li class="item like clickable"> 
                          <a class="title-box">
                            <Icon type="md-thumbs-up" />
                            {{item.likeCount}}
                          </a>
                        </li>
                        <li class="item comment clickable"> 
                          <a class="title-box">
                            <Icon type="md-text" />
                            {{item.commentCount}}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </a>
            </div> -->
          </li>
        </ul>
      </Scroll>
      <div v-else class="search-content-none ">
        <p>没有搜索到相关文章</p>
      </div>
    </div>
  </section>
</template>
<script>
import PostItem from  '@/components/page/postItem.component.vue'
import services from '@/config/services'
export default {
  name: 'Search',
  components: {
    PostItem
  },
  data() {
    return  {
      params: {
        query: '',
        pageNum: 1,
        pageSize: 10
      },
      // 总页数
      pages: 0,
      entryList: [],
      contentHeight: document.documentElement.clientHeight - 100
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.params.query = to.query.query.trim()
    this.doQuery()
    next();
  },
  mounted() {
    window.onresize = () => {
      this.contentHeight = document.documentElement.clientHeight - 100
    }
  },
  created() {
    this.params.query = this.$route.query.query.trim()
    this.doQuery()
  },

  methods: {
    async doQuery() {
      this.params.pageNum = 1
      this.entryList = []
      this.getPostList()
    },
    async getPostList() {
      let res = await services.searchPostList(this.params)
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
  },
  
}
</script>
<style lang="scss" scoped>
  .search-content {
    width: 100%;
  }
  .search-content-none {
    width:100%;
    padding: 5rem;
    font-size: 1.2rem;
    color: #666;
    text-align: center;
  }
</style>
