<template>
  <tbody id="my-cart-body">
    <!-- CART BODY -->
    <template v-if="items.length">
      <cartBodyItem v-for="(item,index) in items" :key="item.id" 
      :index="index"
      :cart="item"
      />
    </template>
    <tr v-else>
      <th colspan="6">{{NOTI_EMPTY_PRODUCT}}</th>
    </tr>
  </tbody>
</template>

<script>
import cartBodyItem from "./CartBodyItem";
import { mapState } from "vuex";
import {NOTI_EMPTY_PRODUCT} from '../constans/config'

export default {
  name: "cartBodyTable",
  data() {
    return {
      NOTI_EMPTY_PRODUCT
    };
  },
  components: {
    cartBodyItem,
  },
  computed: {
    ...mapState({
      items: state => state.cart.listCarts
    }),
  },
};
</script>

<style>
</style>