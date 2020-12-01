<template>
  <div class="row">
    <div class="col-lg-8">
      <!--section-->
      <div class="ass1-section ass1-section__edit-post">
        <div class="ass1-section__content">
          <form action="#">
            <div class="form-group">
              <input
                v-model="url_image"
                type="text"
                class="form-control ttg-border-none"
                placeholder="https://"
              />
            </div>
            <div class="form-group">
              <textarea
                v-model="post_content"
                type="text"
                class="form-control ttg-border-none"
                placeholder="Mô tả ..."
              ></textarea>
            </div>
          </form>
          <div class="ass1-section__image" @click="imageUpload">
            <a href="#"><img :src="renderImage" alt="default" /></a>
          </div>
          <a
            href="https://memeful.com/"
            target="_blank"
            class="ass1-btn ass1-btn-meme"
            >Chế ảnh từ meme</a
          >
          <button @click="imageUpload" class="ass1-btn ass1-btn-meme">
            Đăng ảnh từ máy tính
          </button>
          <input
            style="display: none;"
            @change="handleUploadImage"
            ref="imageUpload"
            type="file"
            name="images"
          />
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <aside class="ass1-aside ass1-aside__edit-post">
        <div>
          <button @click="handleCreatePost" class="ass1-btn">Đăng bài</button>
        </div>
        <div class="ass1-aside__edit-post-head">
          <span style="display: block; width: 100%; margin-bottom: 10px"
            >Chọn danh mục</span
          >
          <label
            class="ass1-checkbox"
            v-for="item in allCategories"
            :key="item.id"
          >
            <input
              v-model="category"
              :value="item.id"
              type="checkbox"
              name="state-post"
            />
            <span></span>
            <p>{{ item.text }}</p>
          </label>
        </div>
        <div class="ass1-aside__get-code">
          <p>Share Link</p>
        </div>
        <div class="ass1-aside__social">
          <a href="" class="ass1-btn-social__facebook ass1-btn-social"
            ><i class="fa fa-facebook" aria-hidden="true"></i
          ></a>
          <a href="" class="ass1-btn-social__twitter ass1-btn-social"
            ><i class="fa fa-twitter" aria-hidden="true"></i
          ></a>
          <a href="" class="ass1-btn-social__google ass1-btn-social"
            ><i class="fa fa-google-plus" aria-hidden="true"></i
          ></a>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {checkImageURL,checkImageFile} from '../helper'

export default {
  name: "post-upload",
  data() {
    return {
      url_image: "",
      post_content: "",
      category: [],
      obj_image: {
        objFile: null,
        base64URL: "",
      },
    };
  },
  computed: {
    allCategories() {
      return this.$store.state.post.categories;
    },
    renderImage() {
      if (this.url_image) return this.url_image;
      else if (this.obj_image.base64URL) return this.obj_image.base64URL;
      return "/dist/images/no_image_available.jpg";
    },
  },
  methods: {
    ...mapActions(['createNewPost']),
    handleUploadImage(e) {
      if (e.target.files && e.target.files.length) {
        const fileImage = e.target.files[0];
        // if (
        //   fileImage.type === "image/png" ||
        //   fileImage.type === "image/gif" ||
        //   fileImage.type === "image/jpg" ||
        //   fileImage.type === "image/jpeg"
        // )
        let check = checkImageFile(fileImage)
        if(check){
          let reader = new FileReader(fileImage);

          reader.addEventListener(
            "load",
            () => {
              // convert image file to base64 string
              let preViewSrc = reader.result;
              this.obj_image.base64URL = preViewSrc;
              this.obj_image.objFile = fileImage;
            },
            false
          );

          if (fileImage) {
            reader.readAsDataURL(fileImage);
          }
        }else{
          alert(" Vui lòng upload file ảnh png/gif/jpg/jpeg)")
        }
      }
    },
    imageUpload() {
      this.$refs.imageUpload.click();
    },
    resetData(){
      this.post_content = '',
      this.url_image = '',
      this.category = '',
      this.obj_image = {
        objFile: null,
        base64URL: "",
      }
    },
    handleCreatePost(){
      let {url_image,post_content,category,obj_image} = this;
      if(post_content && category.length){
        if(checkImageURL(url_image) || obj_image){
          let data={
            post_content,
            url_image,
            category
          }
          if(obj_image.objFile){
            data.obj_image = obj_image.objFile
          }
          this.createNewPost(data).then(res=>{
            // console.log("res:",res)
            if(res.ok){
              this.resetData();
              alert("Đăng bài thành công")
              this.$router.push('/')
            }else{
              alert(res.error)
            }
          })
        }else{
          alert("Vui lòng upload hình ảnh bài viết")
        }
      }else{
        alert("Vui lòng nhập nội dung và chọn danh mục")
      }
    }
  },
};
</script>

<style>
</style>