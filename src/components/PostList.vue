<template>
  <div class="ass1-section__list">
    <PostItem v-for="item in getListPost" :key="item.PID" :post="item"/>
    <button
      @click="hanldeLoadMore"
      v-if="getListPost && getListPost.length"
      class="load-more ass1-btn"
    >
      <span>Xem thêm</span>
    </button>
    <h3 v-else>Danh sách rỗng</h3>
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";
import { mapGetters, mapActions } from "vuex";
import { PAGE_SIZE, CURRENT_PAGE } from "../constants";

export default {
  name: "postlist",
  components: {
    PostItem,
  },
  data() {
    return {
      pagesize: PAGE_SIZE,
      currPage: CURRENT_PAGE,
      tagIndex: this.$route.query.tagIndex,
    };
  },
  watch: {
    '$route'(to, from) {
      this.tagIndex = to.query.tagIndex;
    },
  },
  computed: {
    ...mapGetters(["getListPost"]),
  },
  methods: {
    ...mapActions(["getListPostHasPaging"]),
    hanldeLoadMore() {
      this.currPage++;
      let obj ={
        pagesize:this.pagesize,
        currPage:this.currPage,
        tagIndex:this.tagIndex
      }
      this.getListPostHasPaging(obj)
    },
  },
};
</script>

<style>
.load-more{
  cursor: pointer;
}
</style>