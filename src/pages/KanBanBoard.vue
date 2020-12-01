<template>
  <div class="app">
    <!-- Header component-->
    <HomeHeader />
    <!-- main component -->
    <MainHeader />
    <!-- End Header -->

    <!-- Content -->

    <main class="container">
      <div class="row">
        <div class="col-md-9">
          <!-- list page -->
          <router-view />
        </div>
        <div class="col-md-3">
          <!-- sidebar component -->
          <Sidebar />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import HomeHeader from "../components/HomeHeader";
import MainHeader from "../components/MainHeader";
import Sidebar from "../components/Sidebar";
import {mapGetters,mapActions} from 'vuex'

export default {
  name: "kan-ban-board",
  components: {
    HomeHeader,
    MainHeader,
    Sidebar,
  },
  data() {
    return {};
  },
  computed:{
    ...mapGetters(['getCurrentUser'])
  },
  mounted(){
    this.getUserCustomField()
  },
  methods:{
    ...mapActions(['getUserCustomField'])
  }
};
</script>

<style>
</style>