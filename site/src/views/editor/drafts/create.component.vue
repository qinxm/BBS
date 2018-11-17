<template>
  <section>
    
    <editor-header :content="content"></editor-header>
    <div class="main-content">
      <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
    </div>
  </section>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'newDrafts',
  components: {
      VueEditor
  },
  data() {
    return {
      content: '<h1>Some initial content</h1>',
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
}
</style>
