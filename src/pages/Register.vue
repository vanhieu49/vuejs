<template>
  <div class="app">
    <div id="page-register">
      <div class="container">
        <div class="card card-container">
          <img
            id="profile-img"
            alt=""
            class="profile-img-card"
            src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
          />
          <p id="profile-name" class="profile-name-card"></p>

          <form id="form-signup" class="form-signin" @submit="hanldeRegister">
            <div class="form-group">
              <!-- <label>Email</label> -->
              <input
                v-model="email"
                required
                type="email"
                class="form-control"
                placeholder="Địa chỉ email"
              />
            </div>
            <div class="form-group">
              <!-- <label>Mật khẩu</label> -->
              <input
                v-model="password"
                required
                type="password"
                class="form-control"
                placeholder="Mật khẩu"
              />
            </div>
            <div class="form-group">
              <!-- <label>Nhập lại mật khẩu</label> -->
              <input
                v-model="rePassword"
                required
                type="password"
                class="form-control"
                placeholder="Nhập lại mật khẩu"
              />
            </div>
            <button
              class="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
            >
              Đăng ký
            </button>
          </form>

          <router-link to="/login" class="register">Đăng nhập</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      rePassword: "",
    };
  },
  methods: {
    ...mapActions(["register"]),
    hanldeRegister() {
     
      if (this.email && this.password && this.rePassword) {
        if (this.password === this.rePassword) {
          let data = {
            email: this.email,
            password: this.password,
          };
          this.register(data).then(res=>{
            if(res.ok){
               alert("Đăng ký thành công")
            }else{
              alert(res.error)
            }
          })
        } else {
          alert("Mật khẩu và mật khẩu nhập lại không khớp nhau");
        }
      } else {
        alert("Vui lòng nhập đẩy đủ thông tin");
      }
    },
  },
};
</script>

<style>
</style>