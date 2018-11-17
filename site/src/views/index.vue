<template>
  <section>
   
    <page-header></page-header>
    <div class="container">
      <router-view/>
    </div>
   
  </section>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  margin: 10px auto;
  width: 100%;
  max-width: 960px;
}
</style>
