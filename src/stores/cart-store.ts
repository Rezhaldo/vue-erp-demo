import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Product } from "../modules/products/pages/product-page/model/product-model";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref<{ product: Product; quantity: number }[]>([]);

    const addToCart = (product: Product) => {
      const existing = items.value.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        items.value.push({ product, quantity: 1 });
      }
    };

    const removeFromCart = (productId: number) => {
      items.value = items.value.filter((i) => i.product.id !== productId);
    };

    const clearCart = () => {
      items.value = [];
    };

    const updateQuantity = (id: number, quantity: number) => {
      const item = items.value.find((i) => i.product.id === id);
      if (item) {
        if (quantity <= 0) {
          removeFromCart(id);
        } else {
          item.quantity = quantity;
        }
      }
    };

    const totalItems = computed(() =>
      items.value.reduce((acc, item) => acc + item.quantity, 0)
    );

    const totalPrice = computed(() =>
      items.value.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    );

    return {
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    };
  },
  {
    persist: true,
  }
);
