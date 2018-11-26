<template>
  <section>
    <Modal
      v-model="showModal"
      :mask-closable="false"
      :footer-hide="true"
      :width="300"
      title="登录">
      <a  slot="close" @click="close">
        <Icon type="ios-close" />
      </a>
      <!-- <span slot="close" @click="close">关</span> -->
      <Form ref="formLogin" :model="loginModel" :rules="formRule">
        <FormItem prop="username">
          <Input type="text" v-model="loginModel.username" placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="loginModel.password" placeholder="请输入密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="handleSubmit('formLogin')">登录</Button>
        </FormItem>
        
      </Form>
    </Modal>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import services from '@/config/services'
import utils from '@/utils/cookie.js'
export default {
  name: 'loginModal',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      _show: false,
      loginModel: {
        username: 'test',
        password: 'test'
      },
      formRule: {}
    }
  },
  computed: {
    showModal: {
      get () {
        return this._show
      },
      set (val) {
        this._show = false
        if(!val) {
          this.$emit('close')
        }
      }
    },
    ...mapGetters('users', {
      nickName: 'getNickName',
    })
  },
  created() {
    this._show = this.show
  },
  methods: {
    ...mapMutations('users', {
      setNickName: 'setNickName' // 将 `this.setNickName()` 映射为 `this.$store.commit('increment')`
    }),
    // setCookie,
    async handleSubmit() {
      let res = await services.login(this.loginModel)
      if(!this.$error(res)) return
      // console.log(res.result)
      // let access_token = res.result.access_token
      // utils.setCookie({
      //   access_token: `${"Bearer"} ${access_token}`,
      // })
      
      this.setNickName(`${res.result.username}`)
      this.$emit('close')
    },
    close() {
      this.$emit('close')
    }
  },
}
</script>

