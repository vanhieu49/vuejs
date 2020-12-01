<template>
  <tr>
    <th scope="row">{{ index + 1 }}</th>
    <td>{{ product.name }}</td>
    <td>{{ formatPrice }}</td>
    <td>
      <input
        @blur="handleUpdate"
        :value="cart.quantity"
        type="number"
        min="1"
      />
    </td>
    <td>
      <strong>{{ formatTotal }}</strong>
    </td>
    <td>
      <a @click.prevent="" class="label label-info update-cart-item" href="#"
        >Update</a
      >
      <a
        @click.prevent="handleDelete"
        class="label label-danger delete-cart-item"
        href="#"
        >Delete</a
      >
    </td>
  </tr>
</template>

<script>
import { toCurrency, validateQuantity } from "../helpers";
import { mapActions } from "vuex";
import { NOTI_ACT_DELETE, NOTI_GREATER_THAN_ONE,NOTI_ACT_UPDATE } from "../constans/config";

export default {
  name: "cartBodyItem",
  props: {
    cart: { type: Object, default: {} },
    index: { type: Number },
  },
  data() {
    return {};
  },
  computed: {
    product() {
      return this.cart.product;
    },
    formatPrice() {
      return toCurrency(this.product.price);
    },
    formatTotal() {
      return toCurrency(this.product.price * this.cart.quantity);
    },
  },
  methods: {
    ...mapActions({
      actDeleteCart: "cart/actDeleteCart",
      actSetLoading: "actSetLoading",
      actUpdateQuantity: "cart/actUpdateQuantity",
    }),

    handleDelete() {
      if (confirm("Bạn có muốn xóa đơn hàng này?")) {
        this.actDeleteCart(this.cart);
        this.$notify(NOTI_ACT_DELETE);
      }
    },
    handleUpdate(e) {
      this.actSetLoading(true);
      setTimeout(() => {
        let quantity = e.target.value;
        const check = validateQuantity(quantity);
        if (check) {
          let data = {
            cartUpdate: this.cart,
            quantity: parseInt(quantity),
          };
          // this.$store.dispatch('cart/actBuyProduct',data)
          this.actUpdateQuantity(data);
          this.$notify(NOTI_ACT_UPDATE)
        } else {
          e.target.value = this.cart.quantity;
          this.$notify(NOTI_GREATER_THAN_ONE);
        }
        this.actSetLoading(false);
      }, 1000);
    },
  },
};
</script>

<style>
</style>