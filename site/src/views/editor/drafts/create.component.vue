<template>
  <section>
    
    <editor-header :content="postContent" :title="postTitle"></editor-header>
    <div class="main-content">
      <Row>
        <Input v-model="postTitle" placeholder="输入标题" style="width: 100%" />
      </Row>
      <Row class="mgt10">
        <vue-editor v-model="postContent" :editorToolbar="customToolbar" style="height:400px;"></vue-editor>
      </Row>
    </div>
  </section>
</template>
<script>
import EditorHeader from './editorHeader.component.vue'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'newDrafts',
  components: {
    VueEditor,
    EditorHeader
  },
  data() {
    return {
      postTitle: '',
      postContent: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['image', 'code-block']
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  position: fixed;
  top: 5.334rem;
  width: 960px;
  left: 50%;
  margin-left: -480px;
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-size: 1.334rem;
  background-color: #fff;
  border-bottom: 1px solid #f7f7f7;
  user-select: none;
  z-index: 50;
  padding: 10px;
  height: 100%;
}
</style>
