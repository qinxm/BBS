<template>
  <section>
    <Modal
      v-model="showModal"
      :mask-closable="false"
      :footer-hide="true"
      :width="300"
      title="新增分类">
      <a  slot="close" @click="close">
        <Icon type="ios-close" />
      </a>
      <!-- <span slot="close" @click="close">关</span> -->
      <Form ref="formCategory" :model="categoryModel" :rules="formRule" :label-width="100" >
        <FormItem prop="name" label="分类名称:">
          <Input type="text" v-model="categoryModel.name" placeholder="名称">
            
          </Input>
        </FormItem>
        <Button type="primary" long @click="handleSubmit('formCategory')">保存</Button>
       
        
      </Form>
    </Modal>
  </section>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import services from '@/config/services'
import utils from '@/utils/cookie.js'
export default {
  name: 'addCategory',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      _show: false,
      categoryModel: {
      },
      formRule: {
        name: [{required: true, message: '请输入分类名称'}]
      }
    }
  },
  computed: {
    showModal: {
      get () {
        return this._show
      },
      set () {
        this._show = false
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
    async handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.doSave()
        }
      })
    },
    async doSave() {
      let res = await services.createCategory(this.categoryModel)
      if(!this.$error(res)) return
      this.$emit('close')
    },
    close() {
      this.$emit('close')
    }
  },
}
</script>

