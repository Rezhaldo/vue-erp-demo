import { APIClient } from "@shared/api";
import { onMounted, ref } from "vue";
import type { CartData } from "../model/cart-model";

async function getCartList(param?: string): Promise<CartData> {
  const res = await APIClient.get(`/carts${param ? `?${param}` : ""}`);

  if (res.error) {
    return { carts: [], total: 0 };
  }

  return res.data;
}

export function useGetCartItems() {
  const cartItem = ref<CartData>({ carts: [], total: 0 });
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const fetchCategories = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await getCartList();

      cartItem.value = {
        carts: res.carts || [],
        total: res.total || 0,
      };

      console.log("Fetched cartItem:", cartItem.value);
    } catch (err: any) {
      error.value = err.message || "Failed to fetch cartItem";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchCategories);

  return { cartItem, isLoading };
}
