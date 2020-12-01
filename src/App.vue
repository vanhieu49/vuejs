<template>
  <div id="app">
    <Navigation />
    <router-view></router-view>
    <CompFooter />
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import CompFooter from "./components/CompFooter";
import Contact from "./pages/Contact";
export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Navigation,
    CompFooter,
    Contact,
  },
};
</script>

<style>
</style>
