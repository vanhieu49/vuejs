<template>
  <div id="app">
  
    <div class="container">
      <!-- TITLE : START -->
      <compTile />
      <!-- TITLE : END -->

      <div class="row">
        <!-- LIST PRODUCT : START -->
        <prodcutList />
        <!-- LIST PRODUCT : END -->

        <!-- CART : START -->
        <cartWrapper />
        <!-- CART : END -->
      </div>
      <notifications group="noti" position="bottom right" :duration="2000" />
        <Loading :class="{show:isLoading}"/>
    </div>
  </div>
</template>
<script>
import compTile from "./components/CompTitle";
import prodcutList from "./components/ProductList";
import cartWrapper from "./components/CartWrapper";
import Loading from './components/Loading'
import {mapState} from 'vuex'

export default {
  name: "app",
  data() {
    return {
      show:'',
    };
  },
  components: {
    compTile,
    prodcutList,
    cartWrapper,
    Loading
  },
  computed:{
    ...mapState(['isLoading'])
  }
  // mounted() {
  //   this.$notify({
  //     group: "noti",
  //     title: "Important message",
  //     text: "Hello user! This is a notification!",
  //   });
  // },
};
</script>

<style>
.vue-notification-wrapper{
  padding-right: 10px;
  padding-bottom: 10px;
}
</style>
