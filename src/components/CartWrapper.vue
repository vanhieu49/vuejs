<template>
  <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7">
    <div class="panel panel-info">
      <div class="panel-heading">
        <h1 class="panel-title">Your Cart</h1>
      </div>
      <div class="panel-body">
        <table class="table">
          <!-- header -->
          <cartHeader />
          <!-- body -->
          <cartBodyTable />
          <!-- footer -->
          <cartFooter />
        </table>
      </div>
    </div>
    
  </div>
</template>

<script>
import cartHeader from "./CartHeader";
import cartBodyTable from "./CartBodyTable";
import cartFooter from "./CartFooter";

export default {
  name: "cartWrapper",
  data() {
    return {};
  },
  components: {
    cartHeader,
    cartBodyTable,
    cartFooter,

  },
};
</script>

<style>
</style>