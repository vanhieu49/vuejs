<template>
  <div>
    <PageHeader
      bg="/dist/img/home-bg.jpg"
      title="Clean Blog"
      subheading="A Blog Theme by Start Bootstrap"
    />
    <BLogList />
  </div>
</template>

<script>
import PageHeader from "../components/PageHeader";
import BLogList from "../components/BlogList";
export default {
  name: "home-page",
  components: {
    PageHeader,
    BLogList,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>