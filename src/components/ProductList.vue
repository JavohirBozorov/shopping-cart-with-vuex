<template>
  <div class="">
    <div class="title">
      <h1>Product List</h1>
      <h3 class="basket">{{ LENGTH_CART.length }}</h3>
    </div>
    <ul>
      <li v-for="(product, inx) in products" :key="inx">
        {{ product.title }} - {{ product.price }}$ -
        {{ product.inventory }}
        <button
          :disabled="!PRODUCT_IN_STOCK(product)"
          @click="ADD_PRODUCT_TO_CART(product)"
        >
          Add To Cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(["products"]),
    ...mapGetters(["PRODUCT_IN_STOCK", "LENGTH_CART"]),
  },
  methods: {
    ADD_PRODUCT_TO_CART(product) {
      this.$store.dispatch("ADD_PRODUCT_TO_CART", product);
    },
  },
  created() {
    this.loading = true;
    this.$store.dispatch("FETCH_PRODUCTS").then(() => (this.loading = false));
  },
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-around;
}
.basket {
  border-radius: 10px;
  border: 2px solid #ede;
  width: 2rem;
  height: 2rem;
  padding-top: 0.5rem;
  align-items: center;
}
</style>
