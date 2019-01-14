<template>
  <section class="view">
    <div class="theme-self">
      <Form ref="formTheme" :label-width="80">
        <FormItem label="CSS路径:">
          <Input v-model="cssFilePath" placeholder="请输入文件保存物理路径" style="width: 300px" />
        </FormItem>
        <FormItem label="按钮颜色:">
          <RadioGroup v-model="theme.$buttonColor" class="theme-content">
            
            <Radio v-for="item in buttonColorList" :key="item" :label="item">
              <span class="theme-color" :style="{backgroundColor: item}" >{{item}}</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="背景颜色:">
          <RadioGroup v-model="theme.$bgColor" class="theme-content">
           <Radio v-for="item in buttonColorList" :key="item" :label="item">
              <span class="theme-color" :style="{backgroundColor: item}" >{{item}}</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="字体大小:">
          <RadioGroup v-model="theme.$fontSize">
            <Radio label="12">
              <span class="fz12">12px</span>
            </Radio>
            <Radio label="14">
              <span class="fz14">14px</span>
            </Radio>
            <Radio label="16">
              <span class="fz16">16px</span>
            </Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="toSubmit">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import services from "@/config/services";
export default {
  name: "ThemeSelf",
  data() {
    return {
      // 背景颜色
      bgColorList: ['#17233d','#515a6e','#f8f8f9','#808695'],
      // 按钮颜色
      buttonColorList: ['#2db7f5','#19be6b','#ff9900','#ed4014'],

      theme: {
        $buttonColor: "",
        $fontSize: "",
        $bgColor: ""
      },
      cssFilePath: '/Users/qinxm/Sites/BBS/github/BBS/site/src/assets/static/css/self.scss'
    };
  },
  computed: {
    ...mapGetters("users", {
      userId: "getUserId",
      userName: "getUserName"
    })
  },
  methods: {
    // 提交
    async toSubmit() {
      let res = await services.createTheme({
        userId: this.userId,
        userName: this.userName,
        themestring: JSON.stringify(this.theme),
        cssFilePath: this.cssFilePath
      });
      if (!this.$error(res)) return;
      this.$Message.success("提交成功");
      // console.log(this.theme);
    }
  }
};
</script>