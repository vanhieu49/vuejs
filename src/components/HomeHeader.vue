<template>
  <header>
    <div class="container">
      <ul>
        <router-link tag="li" to="/">Trang Chủ</router-link>
        <router-link tag="li" to="/create">Tạo Task</router-link>
      </ul>
      <ul class="right">
        <template v-if="isLogin && currentUser">
          <li>Xin chào, {{ currentUser.email }}</li>
          <li @click="hanldeLogout">Đăng xuất</li>
        </template>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "home-header",
  data() {
    return {};
  },
  computed: {
    ...mapState(["currentUser"]),
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions(["logOut"]),
    hanldeLogout() {
      if (confirm("Bạn muốn đăng xuất")) {
        this.logOut().then((res) => {
          if (res.ok) {
          } else {
            alert(res.error);
          }
        });
      }
    },
  },
};
</script>

<style>
.container ul li {
  cursor: pointer;
}
</style>