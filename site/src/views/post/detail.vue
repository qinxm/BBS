<template>
  <section class="view">
    <div class="main-area article-area shadow" style="width:100%;">
      <article>
        <div class="author-info-block">
          <div class="lazy avatar loaded" :style="{backgroundImage: avatarUrl}">
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
      <div class="comment-list-box">
        <div class="title">评论</div>
        <div class="comment-form comment-form" >
          <div class="lazy avatar avatar loaded" style='background-image: url("https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL0ibqwcbPlAmBMul8psYKgMcRbfYP3K357ydshJ9YcazNj8iaaDGkeV03u5TyZswaZf2KpuJ7KdYHw/132");'> </div>
          <div class="form-box">
            <Input v-model="commentVal" placeholder="输入评论..." style="flex:1" />
            <div class="action-box">
              <div class="submit">
                <Button type="primary" @click="submitComment">提交</Button>
              </div>
            </div>
          </div>
        </div>
        <div class="comment-list">
          <div class="item" v-for="item in commentList" :key="item.id">
            <div class="comment">
              <div class="user-popover-box popover">
                <div class="lazy avatar loaded" :style="{backgroundImage: avatarUrl}">
                </div>
              </div>
              <div class="content-box comment-divider-line">
                <div class="meta-box" >
                  <a>{{item.nickname}}</a>
                </div>
                <div class="content">
                  {{item.comment}}
                </div>
                <div class="reply-stat">
                  <time class="time">{{item.createtime | dateformatFromNow}}</time>
                  <div class=" "> 

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

import services from '@/config/services'

export default {
  name: 'PostDetail',
  data() {
    return {
      id: '',
      info: {},
      avatarUrl: '',
      commentVal: '',
      commentList: []
    };
  },
  computed: {
    ...mapGetters('users', {
      userId: 'getUserId',
      userName: 'getUserName'
    }),
  },
  created() {
    this.id = this.$route.params.id;
    this.getInfo()
    this.getComments()
  },
  methods: {
    async getInfo() {
      let res = await services.getPostInfo({pid: this.id})
      if (!this.$error(res)) return
      this.info = res.result
      console.log(this.info)
      this.avatarUrl = `url('${this.info.avatarurl}')`
    },
    async getComments() {
      let res = await services.getPostComments({pid: this.id})
      if (!this.$error(res)) return
      this.commentList = res.result
      // console.log(this.commentList)
    },
    async submitComment() {
      if (!this.commentVal) {
        this.$Message.error('请输入评论')
        return
      }
      let res = await services.addComment({
        pid: this.id,
        authorId: Number(this.userId),
        author: this.userName,
        comment: this.commentVal
      })
      if(!this.$error(res)) return
      this.$Message.success('提交成功')
      this.commentVal = ''
      this.getComments()
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
.comment-list {
  margin: 0 1.666rem 0 4.85rem;
  .item:not(:last-child) {
    margin-bottom: 1.333rem;
  }
  .comment {
    display: flex;
    .meta-box {
      display: flex;
      align-items: center;
      font-size: 1.083rem;
      line-height: 1.2;
      white-space: nowrap;
    }
    .content {
      margin-top: .55rem;
      font-size: 1.083rem;
      line-height: 1.833rem;
      color: #505050;
    }
    .reply-stat {
      display: flex;
      margin: 1rem 0;
      font-weight: 400;
      .time {
        font-size: 1.083rem;
        color: #8a9aa9;
        cursor: default;
      }
      .action-box {
        flex: 0 0 auto;
        display: flex;
        -ms-flex-pack: justify;
        justify-content: space-between;
        margin-left: auto;
        min-width: 8.8rem;
        color: #8a93a0;
      }
    }
  }
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
.comment-list-box {
  position: relative;
  background-color: #fff;
  .title {
    color: #8a9aa9;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    padding: 1.67rem 0 5px;
  }
  .avatar {
    margin: 0 1rem 0 0;
    width: 2.667rem;
    height: 2.667rem;
    border-radius: 50%;
  }
  .comment-form {
    display: flex;
    position: relative;
    padding: 1rem 1.333rem;
    background-color: #fafbfc;
    border-radius: 3px;
    margin: 1.333rem 0;
  }
  .form-box {
    flex: 1;
    .action-box{
      display: flex;
      align-items: center;
      margin: .65rem 0 0;
      .submit {
        // flex: 0 0 auto;
        margin-left: auto;
      }
      .submit-btn{
        flex: 0 0 auto;
        margin-left: auto;
        padding: .5rem 1.3rem;
        font-size: 1.25rem;
        color: #fff;
        background-color: #027fff;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }

}
</style>
