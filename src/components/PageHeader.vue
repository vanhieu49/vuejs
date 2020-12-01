<template>
  <header class="masthead" :style="`background-image: url('${bg}')`">
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div :class="className">
            <h1>{{title}}</h1>
            <span class="subheading">{{subheading}}</span>
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "page-header",
  props:{
    bg:{type:String,default:'/dist/img/home-bg.jpg'},
    title:{type:String,default:'Clean Blog'},
    className:{type:String,default:'site-heading'},
    subheading:{type:String,default:'A Blog Theme by Start Bootstrap'}
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>