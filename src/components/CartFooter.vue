<template>
  <tfoot id="my-cart-footer">
    <!-- CART FOOTER -->

    <tr>
      <td colspan="4">
        There are <b>{{ ffootInfo.countItem }}</b> items in your shopping cart.
      </td>
      <td colspan="2" class="total-price text-left">{{ formatPrice }}</td>
    </tr>
  </tfoot>
</template>

<script>
import { mapGetters } from "vuex";
import { toCurrency } from "../helpers";
export default {
  name: "cartFooter",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      ffootInfo: "cart/ffootInfo",
    }),
    formatPrice() {
      return toCurrency(this.ffootInfo.totalPrice);
    },
  },
};
</script>

<style>
</style>