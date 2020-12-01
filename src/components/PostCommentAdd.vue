<template>
  <div class="ass1-add-comment">
    <form action="#" @submit.prevent="handleAddComment">
      <textarea
        v-model="comment"
        class="form-control ttg-border-none"
        placeholder="Thêm một bình luận"
      ></textarea>
    </form>
    <div class="ass1-add-comment__content">
      <a 
      @click.prevent="handleAddComment"
       class="ass1-add-comment__btn-save ass1-btn-icon"
        ><span>{{renderMaxLength}}</span><i class="icon-Submit_Tick"></i
      ></a>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "post-comment-add",
  data() {
    return {
      comment: "",
      maxLength:180,
      postId: this.$route.params.id,
    };
  },
  watch: {
    $route(to, from) {
      this.postId = to.params.id;
    },
  },
  computed:{
    renderMaxLength(){
      return this.maxLength - this.comment.length;
    }
  },
  methods: {
    ...mapActions(['addNewComment']),
    handleAddComment() {
      if(this.comment && this.comment.length <= this.maxLength){
        let data={
          comment: this.comment,
          postid:this.postId
        }
        this.addNewComment(data).then(res=>{
            // console.log(res)
            if(res.ok){
              this.comment = '';
              alert("Đăng bình luận thành công")
            }else{
              alert(res.error)
            }
        })
      }else{
        alert("Dữ liệu nhập không được vượt quá 180 ký tự hay rỗng")
      }
    },
  },
};
</script>

<style>
</style>