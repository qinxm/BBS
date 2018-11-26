<template>
  <section class="view welcome-view">
    <div class="welcome__feed"> 
      <ul class="entry-list">
        <li class="item" v-for="item in entryList" :key="item.id">
          <div class="entry">
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
          </div>
        </li>
      </ul>
    </div>
    <aside class="welcome__side">
      <tags></tags>
    </aside>
  </section>
</template>
<script>
import services from '@/config/services'
export default {
  name: 'Home',
  data() {
    return {
      params: {
        pageNum: 1,
        pageSize: 10
      },
      entryList: [{
        author: '愚人码头',
        authorId: '12',
        publishTime: '2小时前',
        tags: ['vue.js', 'Javascript'],
        title: "Vue.js 3.0 新特性预览",
        entryCode: '5bf1f4d2e51d451dca476889',
        likeCount: 41,
        commentCount: 9,
      }, {
        author: '愚人码头',
        authorId: '12',
        publishTime: '2小时前',
        tags: ['vue.js', 'Javascript'],
        title: "Vue.js 3.0 新特性预览",
        entryCode: '5bf1f4d2e51d451dca476889',
        likeCount: 41,
        commentCount: 9,
      },{
        author: '愚人码头',
        authorId: '12',
        publishTime: '2小时前',
        tags: ['vue.js', 'Javascript'],
        title: "Vue.js 3.0 新特性预览",
        entryCode: '5bf1f4d2e51d451dca476889',
        likeCount: 41,
        commentCount: 9,
      }]
    }
  },
  created() {
    this.getPostList()
  },
  methods: {
    async getPostList() {
      let res = await services.getPostList(this.params)
      if(!this.$error(res)) return
      this.entryList = res.result
      this.entryList.map((item) => {
        if(item.tags) {
          item.tags = item.tags.replace('，', ',') 
          item.tags = item.tags.split(',')
        }
        return item
      })
      console.log(this.entryList)
      // this.entryList = res.result && res.result.map((item) => {
      //   item.publishTime = 
      // })
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
  .entry-list {
    width: 100%;
    background-color: #fff;
    &>.item{
      &:hover{
        background: #fbfbfb;
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgba(178,186,194,.15);
      }
    }
    .entry {
      .content-box {
        display: flex;
        padding: 1.5rem 2rem;

        .meta-row {
          font-size: 1rem;
          color: #b2bac2;
        
          .meta-list {
            display: flex;
            align-items: baseline;
            white-space: nowrap;

            .item:not(:last-child):after {
              content: "\B7";
              margin: 0 .4em;
              color: #b2bac2;
            }
            .tag:not(:last-child):after{
              content: "/";
              margin: 0 .1rem;
              color: #b2bac2;
            }
          }
        }
        .title-row{
          margin: .5rem 0 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .title {
          font-size: 1.4rem;
          font-weight: 600;
          line-height: 1.2;
          color: #2e3135;
        }
        .action-list {
          display: inline-flex;
          white-space: nowrap;
          .item {
            color: #b2bac2;
            border-radius: 1px;
            border: 1px solid #edeeef;
            height: 2rem;
            font-size: 1.083rem;
            line-height: 1;
            display: flex;
            align-items: center;
            &.comment {
              margin-left: -1px;
            }
            .title-box {
              display: flex;
              align-items: center;
              padding: 0 .8rem;
              height: 100%;
              i {
                margin-right: .3rem;
              }
            }
          }
        }
      }
    }
  }

  
</style>

