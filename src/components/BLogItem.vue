<template>
  <div class="post-preview" v-if="blog">
    <router-link
      :to="{
        name: 'blog-detail',
        params: {
          id:blog.id,
          title:formatTitle 
          },
      }"
    >
      <h2 class="post-title">
        {{ blog.title }}
      </h2>
      <h3 class="post-subtitle">
        {{ blog.abstract }}
      </h3>
    </router-link>
    <p class="post-meta">
      Posted by <a href="#">{{ blog.fullName }}</a> on {{ formatDate }}
    </p>
  </div>
</template>

<script>
export default {
  name: "blog-item",
  props: {
    blog: { type: Object, default: null },
  },
  data() {
    return {};
  },
  computed: {
    formatDate() {
      var date = this.blog.create_at;
      var monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return day + " " + monthNames[monthIndex] + " " + year;
    },
    formatTitle(){
      return this.blog.title.split(' ').join('-').toLowerCase().replace('.','');
    }
  },
};
</script>

<style>
</style>