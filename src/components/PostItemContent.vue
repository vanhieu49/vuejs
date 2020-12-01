<template>
  <div class="ass1-section__content">
    <p  v-if="!querySearch" v-html="formatFullname"/>
     <p  v-else  v-html="formatFullname"/>
    <div class="ass1-section__image">
      <router-link :to="getPostLink"
        ><img :src="post.url_image" :alt="post.post_content"
      /></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "post-item-content",
  props: {
    post: { type: Object, default: null },
  },
  data() {
    return {
       querySearch: this.$route.query.query,
    };
  },
  computed:{
    getPostLink(){
      return { name: 'post-detail', params: { id: this.post.PID } };
    },
      formatFullname() {
      if (this.querySearch) {
        return this.post.post_content
          .toLowerCase()
          .replaceAll(
            this.querySearch.toLowerCase(),
            `<mark>${this.querySearch}</mark>`
          );
      } else {
        return this.post.post_content;
      }
    },
  },
   watch: {
    $route(to, from) {
      this.querySearch = to.query.query;
    },
  },
};
</script>

<style>
</style>