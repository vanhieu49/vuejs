<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <BlogItem
        v-for="item in listBlogs"
        :key="item.id"
        :blog="item"
        />     
        <!-- Pager -->
        <div class="clearfix">
          <a class="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import BlogItem from './BLogItem'

export default {
  name: "blog-list",
  data() {
    return {};
  },
  components:{
    BlogItem
  },
  computed:{
    ...mapState(['listBlogs'])
  }
};
</script>

<style>
</style>