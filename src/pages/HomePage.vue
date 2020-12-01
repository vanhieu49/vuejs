<template>
  <!--sections-->
  <div class="row">
    <div class="col-lg-8">
      <PostList />
    </div>
    <div class="col-lg-4">
      <Slidebar />
    </div>
  </div>
</template>

<script>
import Slidebar from "../components/Sidebar";
import PostList from "../components/PostList";
import { mapActions } from "vuex";

export default {
  name: "home-page",
  components: {
    Slidebar,
    PostList,
  },
  data() {
    return {};
  },
  watch: {
    '$route'(to, from) {
      var tagIndex = to.query.tagIndex;
      this.$store.dispatch("getListPostHasPaging", { tagIndex });
    },
  },
  created(){
    // console.log(this.$store)
    var tagIndex = this.$route.query.tagIndex;
    this.$store.dispatch("getListPostHasPaging",{tagIndex});
  },
  methods: {
    ...mapActions(["getListPostHasPaging"]),
  },
};
</script>

<style>
</style>