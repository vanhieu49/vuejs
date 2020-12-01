<template>
  <div>
    <!-- page-user-info -->
    <UserPageInfo 
    :userInfor="userInfor"
    :countPost="countPost"
    />
    <!--sections-->
    <div
      v-if="listPostOfUser && listPostOfUser.length"
      v-masonry
      column-width=".grid-sizer"
      transition-duration="0.3s"
      item-selector=".ass1-section__item"
      class="ass1-section__wrap row ass1-section__isotope-init"
    >
      <!--section-->
      <div class="grid-sizer"></div>
      <!-- PostItem -->
      <PostItem
        v-masonry-tile
        v-for="item in listPostOfUser"
        :key="item.PID"
        :post="item"
        class="col-lg-6"
      />
    </div>
  </div>
</template>

<script>
import UserPageInfo from "../components/UserPageInfo";
import PostItem from "../components/PostItem";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "user-page",
  components: {
    UserPageInfo,
    PostItem,
  },
  data() {
    return {
      userInfor: null,
      listPostOfUser: [],
      userid: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters(["getListPostOfCurrentUser"]),
    countPost(){
      if(this.listPostOfUser && this.listPostOfUser.length){
        return this.listPostOfUser.length;
      }
      return 0;
    }
  },
  watch: {
    $route(to, from) {
      this.userid = to.params.id;
      this.fetchAllData();
    },
  },
  created() {
    this.fetchAllData();
  },
  methods: {
    ...mapActions(["getUserById", "getPostListPostByUser", "setLoading"]),
    async fetchAllData() {
      let userid = this.userid;
      this.setLoading(true);
      let promiseUser = this.getUserById(userid);
      let promiseUserPost = this.getPostListPostByUser(userid);
      let [resultUser, resultUserPost] = await Promise.all([
        promiseUser,
        promiseUserPost,
      ]);
      this.setLoading(false);
      if (resultUser.ok && resultUserPost.ok) {
        this.userInfor = resultUser.data;
        this.listPostOfUser = resultUserPost.posts;

        // data changed
        this.$redrawVueMasonry();
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
</style>