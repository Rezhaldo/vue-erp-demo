import { defineStore } from "pinia";
import { ref } from "vue";

export interface OrderData {
  id: number;
  date: string;
  products: any[];
  total: number;
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export const useOrderHistoryStore = defineStore(
  "orderHistory",
  () => {
    const orders = ref<OrderData[]>([]);

    const addOrder = (order: OrderData) => {
      orders.value.push(order);
    };

    const clearOrders = () => {
      orders.value = [];
    };

    return {
      orders,
      addOrder,
      clearOrders,
    };
  },
  {
    persist: true,
  }
);
