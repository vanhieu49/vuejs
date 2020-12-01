<template>
  <div class="ass1-section__item">
    <!-- header -->
    <PostItemHead :post="post"/>
    <!-- content -->
    <PostItemContent :post="post"/>
    <!-- footer -->
    <!-- <PostItemFooter :post="post"/> -->
  </div>
</template>

<script>
import PostItemHead from "./PostItemHead";
import PostItemContent from "./PostItemContent";
import PostItemFooter from "./PostItemFooter";

export default {
  name: "post-item",
  components: {
    PostItemHead,
    PostItemContent,
    PostItemFooter,
  },
  props: {
    post: { type: Object, default: null },
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>