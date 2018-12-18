<template>
  <header class="main-header">
    <div class="container">
      <a class="logo" href="/">
        <img src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" alt="掘金" class="logo-img">
      </a>
      <nav role="navigation" class="main-nav">
        <ul class="nav-list">
          <li class="main-nav-list">
            <Menu mode="horizontal" theme="light" active-name="0">
              <MenuItem name="1" to="/">
                  首页
              </MenuItem>
              <MenuItem name="2" to="/category/list">
                  分类
              </MenuItem>
            </Menu>
          </li>
          <li class="nav-item search">
            <Input placeholder="搜索" search v-model="searchTxt" style="width: auto" 
            @on-search="doSearch">
            </Input>
          </li>
          <li class="nav-item submit">
            <Button type="primary" @click="newDrafts">写文章</Button>
          </li>
          <li class="nav-item auth" v-if="!isLogin">
            <span class="login" @click="showLogin">登录</span>
            <span class="register">注册</span>
          </li>
          <li class="nav-item logout " v-else>
            <Icon type="ios-text" />
            <span class="nickname">{{nickName}}</span>
            <Button type="primary" @click="logout">登出</Button>
          </li>
          <li class="nav-item">
            <Poptip placement="bottom" width="200">
              <span class="theme">主题</span>
              <div slot="content" class="theme-content">
                <div class="theme-theme1" @click="changeTheme('theme1')"></div>
                <div class="theme-theme2" @click="changeTheme('theme2')"></div>
                <div class="theme-theme3" @click="changeTheme('theme3')"></div>
              </div>
             </Poptip>
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
import { login } from '@/config/services'

import LoginModal from '@/components/login.component.vue'
export default {
  name: 'pageHeader',
  inject: ['reload'],
  components: {
    LoginModal
  },
  data () {
    return {
      showLoginModal: false,
      searchTxt: ''
    }
  },
  computed: {
    ...mapGetters('users', {
      _nickName: 'getNickName',
    }),
    nickName() {
      return this._nickName
    },
    isLogin() {
      return !!this.nickName || !!utils.getCookie('nickName')
    }
  },
  methods: {
    ...mapMutations('users', {
      setLogout: 'setLogout'
    }),
    showLogin() {
      this.showLoginModal = true
    },
    closeLoginModal() {
      this.showLoginModal = false
    },
    logout() {
      this.$Modal.confirm({
        title: '登出',
        content: '确定登出吗？',
        onOk: () => {
          this.setLogout()
          this.reload()
        },
        onCancel: () => {
        }
      });
    },
    // 写文章
    newDrafts() {
      if(this.isLogin) {
        this.$router.push({
          name: 'NewDrafts'
        })
      } else {
        this.showLogin()
      }
     
    },
    // 搜索
    doSearch() {
      this.$router.push({name: 'Search', query: {query:this.searchTxt}})
    },
    changeTheme(theme) {
      window.document.documentElement.setAttribute('data-theme', theme)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-content {
  display: flex;
  div {
    width: 100%;
    height: 30px;
    margin: 5px;
    border-radius: 5px;
  }
}
.main-header {
  position: relative;
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
  }
  
  .nav-item{
    display: flex;
    box-align: center;
    align-items: center;
    height: 100%;
    padding:0 1.2rem;
    margin: 0;
    cursor: pointer;
    &.search {
      flex: 1 1 auto;
      justify-content: flex-end;
      cursor: auto;
    }
    &.submit {
      position: relative;
    }
    &.auth {
      font-size: 14px;
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
    span {
      font-size: 14px;
    }
  }
}
</style>
