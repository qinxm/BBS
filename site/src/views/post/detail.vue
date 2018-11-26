<template>
  <section class="view">
    <div class="main-area article-area shadow">
      <article>
        <div class="author-info-block">
          <div class="lazy avatar avatar loaded" v-bind:style="{backgroundImage: avatarUrl}">
          </div>
          <div class="author-info-box">
            <a target="_blank" class="username ellipsis">{{info.author}}</a>
            <div class="meta-box">
              <span> {{info.publishtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>

              <span class="views-count">阅读 {{info.viewtimes}}</span>
            </div>
          </div>
        </div>
        <h1 class="article-title">{{info.title}}</h1>
        <div class="article-content" v-html="info.message">
        </div>
      </article>
    </div>
  </section>
</template>
<script>
import services from '@/config/services'

export default {
  data() {
    return {
      id: '',
      info: {},
      avatarUrl: ''
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getInfo()
  },
  methods: {
    async getInfo() {
      let res = await services.getPostInfo({pid: this.id})
      if (!this.$error(res)) return
      this.info = res.result
      console.log(this.info)
      this.avatarUrl = `url('${this.info.avatarurl}')`
    }
  }
};
</script>
<style lang="scss" scoped>
article {
  margin-bottom: 3rem;
  padding: 2rem 0;
}
.avatar {
  display: inline-block;
  position: relative;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #eee;
}
.article-area {
  margin-bottom: 1.5rem;
  padding: 0 2rem;
}
.author-info-block {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  .author-info-box{
    min-width: 0;
  }
  .avatar {
    flex: 0 0 auto;
    margin-right: 1rem;
    width: 3.333rem;
    height: 3.333rem;
    border-radius: 50%;
  }
}
.article-title {
  margin: .67em 0;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.5;

}
.article-content {
  word-break: break-word;
  line-height: 1.75;
  font-weight: 400;
  font-size: 15px;
}
.views-count{
  margin-left: 10px;
}
</style>
