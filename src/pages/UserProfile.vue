<template>
  <div class="ass1-login">
    <div class="ass1-login__content">
      <p>Profile</p>

      <div class="ass1-login__form">
        <div class="avatar">
          <img :src="getAvatar" alt="" />
        </div>
        <form action="#" v-if="currentUser" @submit.prevent="handleEditProfile">
          <input
            v-bind:value="currentUser.fullname"
            v-on:input="fullname = $event.target.value"
            type="text"
            class="form-control"
            placeholder="Tên ..."
            required=""
          />

          <select
            :value="currentUser.gender"
            v-on:input="gender = $event.target.value"
            class="form-control"
          >
            <option value="">Giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
          </select>
          <input
            @change="upLoadAvatar"
            type="file"
            name="avatar"
            placeholder="Ảnh đại diện"
            class="form-control"
          />
          <textarea
            :value="currentUser.description"
            v-on:input="description = $event.target.value"
            class="form-control"
            cols="30"
            rows="5"
            placeholder="Mô tả ngắn ..."
          ></textarea>
          <div class="ass1-login__send justify-content-center">
            <button type="submit" class="ass1-btn">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "user-profile",
  data() {
    return {
      fullname: "",
      description: "",
      gender: "",
      avatarFile: null,
      avatar: {
        objFile: null,
        base64URL: "",
      },
      userid: this.$route.params.id,
    };
  },
  watch: {
    $route(to, from) {
      this.userid = to.params.id;
      this.checkIsCurrentUser();
    },
  },
  created() {
    this.checkIsCurrentUser();
  },
  computed: {
    ...mapGetters(["currentUser"]),
    getAvatar() {
      if (this.avatar.base64URL === "" && this.currentUser) {
        return this.currentUser.profilepicture;
      } else {
        return this.avatar.base64URL;
      }
    },
  },
  methods: {
    ...mapActions(["updateProfile"]),
    checkIsCurrentUser() {
      if (this.userid && this.currentUser) {
        if (this.userid !== this.currentUser.USERID) {
          this.$router.push("/");
        }
      }
    },
    handleEditProfile() {
      if (!this.fullname) this.fullname = this.currentUser.fullname;
      if (!this.gender) this.gender = this.currentUser.gender;
      if (!this.description) this.description = this.currentUser.description;
      if (this.fullname && this.description && this.gender) {
        let data = {
          fullname: this.fullname,
          description: this.description,
          gender: this.gender,
        };
        if (this.avatar.objFile) {
          data.objFile = this.avatar.objFile;
        }
        this.updateProfile(data).then((res) => {
          if (res.ok) {
            alert("Cập nhật thành công");
            this.$router.push("/");
          } else {
            alert(res.error);
          }
        });
      }
    },
    upLoadAvatar(e) {
      if (e.target.files && e.target.files.length) {
        const fileAvatar = e.target.files[0];
        let reader = new FileReader();

        reader.addEventListener(
          "load",
          () => {
            // convert image file to base64 string
            let preViewSrc = reader.result;
            this.avatar.base64URL = preViewSrc;
            this.avatar.objFile = fileAvatar;
          },
          false
        );

        if (fileAvatar) {
          reader.readAsDataURL(fileAvatar);
        }
      }
    },
  },
};
</script>

<style>
.ass1-btn {
  cursor: pointer;
}
</style>