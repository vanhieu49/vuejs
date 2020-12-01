<template>
  <div class="side-bar">
    <div class="page-title">
      <span>Thành viên</span>
    </div>
    <ul class="list-members">
      <li v-for="email in getListEmailUser" :key="email">{{email}}</li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "sidebar",
  data() {
    return {};
  },
  computed:{
    ...mapGetters(['getListEmailUser'])
  }
};
</script>

<style>
</style>