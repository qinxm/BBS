<template>
  <div class="entry">
    <a>
      <div class="content-box">
        <div class="info-box">
          <div class="info-row meta-row">
            <ul class="meta-list">
              <li class="item username">
                <a>{{item.author}}</a>
              </li>
              <li class="item">
                <span>{{item.publishtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
              </li>
              <li class="item">
                <router-link
                  class="tag"
                  v-for="(tag, tagIndex) in item.tags"
                  :key="tagIndex"
                  :to="{name: 'user', params: {id: tag}}"
                >{{tag}}</router-link>
              </li>
            </ul>
          </div>
          <div class="info-row title-row">
            <router-link
              :to="{name: 'PostDetail', params: {id: item.pid}}"
              class="title"
            >{{item.title}}</router-link>
          </div>
          <div class="info-row action-row">
            <ul class="action-list">
              <li class="item like clickable">
                <a class="title-box" @click="clickLike">
                  <Icon type="md-thumbs-up"/>
                  {{item.liketimes}}
                </a>
              </li>
              <li class="item comment clickable">
                <a class="title-box">
                  <Icon type="md-text"/>
                  {{item.commenttimes}}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import services from '@/config/services'

export default {
  name: "PostItem",
  props: {
    item: {
      type: Object,
      default: {
        pid: '',
        title: '',
        author: '',
        publishtime: '',
        tags: '',
        liketimes: '',
        commenttimes: ''
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('users', {
      userId: 'getUserId',
      userName: 'getUserName'
    }),
  },
  methods: {
   async clickLike() {
      let res = await services.addLike({
        pid: this.item.pid,
        authorId: Number(this.userId),
        author: this.userName
      })
      if(!this.$error(res)) return
      this.$emit('afterChangeLike')
    }
  }
};
</script>
