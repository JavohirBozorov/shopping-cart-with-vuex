<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="(product, index) in CART_PRODUCTS" :key="index">
        {{ product.title }} - {{ product.price }}$ - {{ product.quantity }}
      </li>
    </ul>
    <h3>Total: {{ CART_TOTAL.toFixed(2) }}$</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["CART_PRODUCTS", "CART_TOTAL"]),
  },
};
</script>

<style scoped></style>
