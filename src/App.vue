<template>
  <div id="app">
    <router-view></router-view>
     <Loading :class="{ show: isLoading }" />
  </div>
</template>

<script>
import Loading from "./components/Loading";
import { mapState,mapActions } from "vuex";

export default {
  name: "app",
  components: {
    Loading,
  },
  data() {
    return {};
  },
  computed:{
     ...mapState(["isLoading"]),
  },
  methods:{
    ...mapActions(['onListenerTask','onListenerUsers'])
  },
  created(){
    this.onListenerTask();
    this.onListenerUsers();
  }
};
</script>

<style>
</style>
