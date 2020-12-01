<template>
  <div class="ass1-comments">
    <div class="ass1-comments__head">
      <div class="ass1-comments__title">{{comments.length}} Bình luận</div>
      <div class="ass1-comments__options">
        <span>Sắp xếp theo:</span>
        <a href="#" class="ass1-comments__btn-upvote ass1-btn-icon"
          ><i class="icon-Upvote"></i
        ></a>
        <a href="#" class="ass1-comments__btn-down ass1-btn-icon"
          ><i class="icon-Downvote"></i
        ></a>
        <a href="#" class="ass1-comments__btn-expand ass1-btn-icon"
          ><i class="icon-Expand_all"></i
        ></a>
      </div>
    </div>
    <PostCommentItem  v-for="cms in comments" :key="cms.CID" :comment="cms"/>
  </div>
</template>

<script>
import PostCommentItem from './PostCommentItem'

export default {
  name: "post-comment",
  components:{
      PostCommentItem
  },
  props:{
    comments:{type:Array,default:[]}
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>