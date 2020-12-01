<template>
  <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h1 class="panel-title">List Products</h1>
      </div>
      <div class="panel-body" id="list-product">
        <productItem 
        v-for="item in products" :key="item.id"
        :product="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import productItem from "./ProductItem";
import {mapState} from 'vuex'

export default {
  name: "productList",
  data() {
    return {};
  },
  components: {
    productItem,
  },
  computed:{
    ...mapState({
      products: state => state.product.productList
    })
  }
};
</script>

<style>
</style>