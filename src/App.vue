<template>
  <div id="app">
    <AppHead v-if="isRenderHead" />
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
    <Footer v-if="isRenderFooter" />
    <Loading :class="{ show: isLoading }" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppHead from "./components/AppHead";
import Footer from "./components/AppFooter";
import Loading from "./components/Loading";

export default {
  name: "app",
  components: {
    AppHead,
    Footer,
    Loading,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["isLoading"]),
    isRenderHead() {
      let arrRoute = ["login", "register"];
      let nameRoute = this.$route.name;
      if (arrRoute.indexOf(nameRoute) !== -1) return false;
      return true;
    },
    isRenderFooter() {
      let arrRoute = ["home-page", "post-detail"];
      let nameRoute = this.$route.name;
      if (arrRoute.indexOf(nameRoute) !== -1) return false;
      return true;
    },
  },
  created() {
    this.chekLogin();
  },
  methods: {
    ...mapActions(["chekLogin"]),
  },
};
</script>

<style>
</style>
