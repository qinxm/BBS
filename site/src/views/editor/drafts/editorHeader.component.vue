<template>
  <header class="main-header">
    <div class="container">
      <a class="logo" href="/">
        <img data-v-5ce25e66="" src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="掘金" class="logo-img">
      </a>
      <nav role="navigation" class="main-nav">
        <ul class="nav-list">
          <li class="main-nav-list"></li>
          <Poptip v-model="publishPopvisible" placement="bottom" width="400" class="publish-poptip">
              <Button type="primary" >发布</Button>
              <div class="panel" slot="content">
                <div class="title">发布文章</div>
                <div class="category-box">
                  <div class="sub-title">选择分类</div>
                  <div class="category-list">
                    <div v-for="(item) in categoryList" :key="item.id" class="item" :class="item.active? 'active': ''"
                      @click="selectCategory(item)"
                    >{{item.name}} </div>
                  </div>
                  <div class="sub-title">标签</div>
                  <Input v-model="tags" placeholder="Enter something..." style="width: 100%" />
                </div>
                <div class="footer">
                  <Button type="primary" @click="publishArticle">确定并发布</Button>
                </div>
              </div>
          </Poptip>
          <li class="nav-item logout ">
            <Icon type="ios-text" />
            <span class="nickname">{{nickName}}</span>
          </li>
        </ul>
      </nav>
      
    <login-modal v-if="showLoginModal" :show="showLoginModal" @close="closeLoginModal"></login-modal>
    </div>
  </header>
</template>
<script>

import { mapGetters, mapMutations } from "vuex";
import utils from '@/utils/cookie.js'
import services from '@/config/services'
import LoginModal from '@/components/login.component.vue'
export default {
  name: 'PageHeader',
  components: {
    LoginModal,
  },
  props: {
    content: String,
    title: String,
    clearContent: Function
  },
  data () {
    return {
      showLoginModal: false,
      publishPopvisible: false,
      categoryList: [{
        id: 1,
        name: 'Andorid',
        active: false,
      },{
        id: 2,
        name: '前端',
        active: false,
      }, {
        id: 3,
        name: 'iOS',
         active: false,
      }],
      tags: ''
    }
  },
  computed: {
    ...mapGetters('users', {
      nickName: 'getNickName',
      userName: 'getUserName',
      userId: 'getUserId'
    }),
    isLogin() {
      return !!this.nickName
    },
    categoryId() {
      if(this.categoryList.length) {
        let selectedCategory = this.categoryList.filter(item => item.active)
        return selectedCategory.length && selectedCategory[0].id || ''
      } else {
        return ''
      }
    }
  },
  methods: {
    initPage () {
      this.publishPopvisible = false
      this.tags = ''
      this.categoryList.map(item => {
        item.active = false
      })
      this.clearContent()
    },
    selectCategory(selected) {
      this.categoryList.map(item => {
        if (item.id == selected.id) {
          item.active = true
        } else {
          item.active = false
        }
      })
    },
    async publishArticle() {
      if (!this.title) {
        this.$Notice.error({
          title: '标题不能为空'
        });
        return 
      }
      if (!this.content) {
        this.$Notice.error({
          title: '内容不能为空'
        });
        return 
      }
      let model = {
        "title": this.title,
        "author": this.userName,
        "authorid": this.userId,
        "tags": this.tags,
        "subject": this.categoryId,
        "message": this.content}
      let res = await services.createPost(model)
      if (res.code == 200) {
        this.$Message.success('发布成功')
        this.initPage()
      }
      
    },
    showPublishPop() {
      alert('ss')
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.2s;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
  color: #909090;
  height: 5rem;
  z-index: 250;
  &.visible {
    transform: translateZ(0);
  }
  .container {
    display: flex;
    box-align:center;
    align-items: center;
    height: 100%;
    max-width: 960px;
    margin: auto;
    
    .main-nav {
      flex:1;
      display: flex;
    }
  }

  .logo {
    margin-right: 2rem;
  }
  .nav-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100%;
    margin: 0;
    font-size: 1.33rem;
    flex: 1;
    .main-nav-list {
      flex: 1;
    }
  }
  
  
  .nav-item{
    display: flex;
    box-align: center;
    align-items: center;
    height: 100%;
    padding:0 1.2rem;
    margin: 0;
    &.search {
      flex: 1 1 auto;
      justify-content: flex-end;
      cursor: auto;
    }
    &.submit {
      color: #007fff;
      position: relative;
    }
    &.auth {
      color: #007fff;
      .login {
        &::after {
          content: "\B7";
          margin: 0 .4rem;
        }
      }
    }
    &.logout{
      .nickname{
        font-size: 1rem;
        margin-right: 1rem;
        
      }
    }
    &:last-child {
      padding-right:0;
    }
  }
  .publish-poptip {
    .title {
      margin-bottom: 1rem;
      font-size: 1.56rem;
      font-weight: 700;
      color: hsla(218,9%,51%,.8);
    }
    .sub-title {
      margin: 1rem 0 0.5rem 0;
      font-size: 1.334rem;
    }
    .content{
      padding: 1rem;
    }
    .footer {
      margin: 1rem 0;
      text-align: center;
    }
  }
  
  .panel {
    .category-list {
      .item {
        display: inline-block;
        margin: 0 .6rem .8rem 0;
        padding: .4rem .7rem;
        font-size: 1.1rem;
        white-space: nowrap;
        border: 1px solid #f1f1f1;
        border-radius: 2px;
        cursor: pointer;
        &.active {
          color: #007fff;
          border-color: rgba(0,127,255,.15);
          background-color: rgba(0,127,255,.05);
        }
      }
    }
  }

}
</style>
