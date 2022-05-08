import { createStore } from "vuex";
import shop from "@/api/shop";

export default createStore({
  state: {
    products: [],
    cart: [],
  },
  getters: {
    AVAILABLE_PRODUCTS(state) {
      return state.products.filter((product) => product.inventory > 0);
    },
    CART_PRODUCTS(state) {
      return state.cart.map((cartItem) => {
        const product = state.products.find(
          (product) => product.id === cartItem.id
        );
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        };
      });
    },
    LENGTH_CART(state) {
      return state.cart;
    },
    CART_TOTAL(state, getters) {
      return getters.CART_PRODUCTS.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
    PRODUCT_IN_STOCK() {
      return (product) => {
        return product.inventory > 0;
      };
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    PUSH_PRODUCT_TO_CART(state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1,
      });
    },
    INCREMENT_ITEM_QUANTITY(state, cartItem) {
      cartItem.quantity++;
    },
    DECREMENT_PRODUCT_INVENTORY(state, product) {
      product.inventory--;
    },
  },
  actions: {
    FETCH_PRODUCTS({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts((products) => {
          commit("SET_PRODUCTS", products);
          resolve();
          reject();
        });
      });
    },
    ADD_PRODUCT_TO_CART({ state, getters, commit }, product) {
      if (getters.PRODUCT_IN_STOCK(product)) {
        const cartItem = state.cart.find((item) => item.id === product.id);
        if (!cartItem) {
          commit("PUSH_PRODUCT_TO_CART", product.id);
        } else {
          commit("INCREMENT_ITEM_QUANTITY", cartItem);
        }
        commit("DECREMENT_PRODUCT_INVENTORY", product);
      }
    },
  },
  modules: {},
});
