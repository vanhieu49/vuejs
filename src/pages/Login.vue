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

          <form id="form-signup" class="form-signin" @submit.prevent="hanldeLogin">
            <div class="form-group">
              <!-- <label>Email</label> -->
              <input
              v-model="email"
                type="email"
                class="form-control"
                placeholder="Địa chỉ email"
              />
            </div>
            <div class="form-group">
              <!-- <label>Mật khẩu</label> -->
              <input
              v-model="password"
                type="password"
                class="form-control"
                placeholder="Mật khẩu"
              />
            </div>
            <button
              class="btn btn-lg btn-primary btn-block btn-signin"
              type="submit"
            >
              Đăng nhập
            </button>
          </form>

          <router-link to="/register" class="register">Đăng ký một tài khoản</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "login",
  data() {
    return {
      email:'',
      password:''
    };
  },
  methods:{
    ...mapActions(['login']),
    hanldeLogin(){
      let {email,password} = this;
      if(email && password){
        this.login({email,password}).then(res=>{
          if(res.ok){
            alert("Đăng nhập thành công");
            
          }else{
            alert(res.error)
          }
        })
      }
    }
  }
};
</script>

<style>

</style>