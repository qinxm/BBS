<template>
  <section>
    <Card class="loginCard">
      <h3 class="title">登录</h3>
      <Form ref="formLogin" :model="loginModel" :rules="formRule">
        <FormItem prop="username">
            <Input type="text" v-model="loginModel.username" placeholder="username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="loginModel.password" placeholder="Password">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formLogin')">登录</Button>
        </FormItem>
        <FormItem>
          <p>{{loginResponse}}</p>
        </FormItem>
    </Form>
    </Card>
  </section>
</template>
<script>
import services from '@/config/services'
export default {
  name: 'Login',
  data() {
    return {
      loginModel: {
        username: 'qinxm',
        password: '123456'
      },
      loginResponse: '',
      formRule: {
        
      }
    }
  },
  methods: {
    async handleSubmit() {
      let res = await services.login(this.loginModel)
      this.loginResponse = res.message

      this.$router.push({
        name: 'Home'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loginCard{
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -150px;
  .title {
    margin-bottom: 15px;

  }
}
</style>
