<template>
  <div class="ass1-section__head">
    <router-link :to="getUserLink" class="ass1-section__avatar ass1-avatar"
      ><img :src="getAvatar" :alt="post.fullname"
    /></router-link>
    <div>
      <router-link
        v-if="!querySearch"
        :to="getUserLink"
        class="ass1-section__name"
        v-html="formatFullname"
      ></router-link>
      <router-link
        v-else
        :to="getUserLink"
        class="ass1-section__name"
        v-html="formatFullname"
      ></router-link>
      <span class="ass1-section__passed">{{ formatTimeAdded }}</span>
    </div>
    <router-link :to="getUserLink" class="ass1-section__link ass1-btn-icon"
      ><i class="icon-Link"></i
    ></router-link>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "post-item-head",
  props: {
    post: { type: Object, default: null },
  },
  data() {
    return {
      querySearch: this.$route.query.query,
    };
  },
  computed: {
    getAvatar() {
      if (this.post.profilepicture) {
        return this.post.profilepicture;
      }
      return "/dist/images/avatar-02.png";
    },
    getUserLink() {
      let userid = this.post.USERID || 1;
      return { name: "user-page", params: { id: userid } };
    },
    formatTimeAdded() {
      moment.locale("vi");
      return moment(this.post.time_added).fromNow();
    },
    formatFullname() {
      if (this.querySearch) {
        return this.post.fullname
          .toLowerCase()
          .replaceAll(
            this.querySearch.toLowerCase(),
            `<mark>${this.querySearch}</mark>`
          );
      } else {
        return this.post.fullname;
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
.ass1-section__name {
  text-transform: capitalize;
}
</style>