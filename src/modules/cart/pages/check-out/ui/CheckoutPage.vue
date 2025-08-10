<template>
  <div>
    <div>
      <h1 class="text-3xl font-bold mb-1">Checkout</h1>
      <p class="text-gray-500 mb-4">Complete your purchase</p>
    </div>

    <div class="space-y-4 md:space-x-4 lg:flex w-full md:items-start">
      <div class="w-full">
        <form
          @submit.prevent="handleCompleteOrder"
          class="border border-gray-200 p-6 rounded-lg space-y-4"
        >
          <p class="text-xl font-semibold mb-4">Shipping Information</p>
          <div class="flex gap-4">
            <div class="w-full">
              <label class="block mb-2 text-xs font-medium">First Name</label>
              <input
                v-model="form.firstName"
                type="text"
                class="border p-2 w-full border-gray-200 rounded-lg"
                required
              />
            </div>
            <div class="w-full">
              <label class="block mb-2 text-xs font-medium">Last Name</label>
              <input
                v-model="form.lastName"
                type="text"
                class="border p-2 w-full border-gray-200 rounded-lg"
                required
              />
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-full">
              <label class="block mb-2 text-xs font-medium">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="border p-2 w-full border-gray-200 rounded-lg"
                required
              />
            </div>
            <div class="w-full">
              <label class="block mb-2 text-xs font-medium">Phone</label>
              <input
                v-model="form.phone"
                type="tel"
                class="border p-2 w-full border-gray-200 rounded-lg"
              />
            </div>
          </div>
          <div class="w-full">
            <label class="block mb-2 text-xs font-medium">Address</label>
            <input
              v-model="form.address"
              type="tel"
              class="border p-2 w-full border-gray-200 rounded-lg"
              required
            />
          </div>
          <div class="flex gap-4">
            <div class="w-full">
              <label class="block mb-2 text-xs font-medium">City</label>
              <input
                v-model="form.city"
                type="text"
                class="border p-2 w-full border-gray-200 rounded-lg"
                required
              />
            </div>
            <div class="w-full">
              <label class="block mb-2 text-xs font-medium">State</label>
              <input
                v-model="form.state"
                type="text"
                class="border p-2 w-full border-gray-200 rounded-lg"
                required
              />
            </div>
            <div class="w-full">
              <label class="block mb-2 text-xs font-medium">ZIP Code</label>
              <input
                v-model="form.zipCode"
                type="text"
                class="border p-2 w-full border-gray-200 rounded-lg"
                required
              />
            </div>
          </div>
        </form>

        <div class="border border-gray-200 p-6 rounded-lg space-y-4 mt-4">
          <p class="text-xl font-semibold">Payment Information</p>

          <div>
            <label class="block text-xs font-medium mb-2"
              >Cardholder Name</label
            >
            <input
              type="text"
              class="border p-2 w-full border-gray-200 rounded-lg"
            />
          </div>

          <div>
            <label class="block text-xs font-medium mb-2">Card Number</label>
            <input
              type="text"
              class="border p-2 w-full border-gray-200 rounded-lg"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div class="flex gap-4">
            <div class="w-full">
              <label class="block text-xs font-medium mb-2">Expiry Date</label>
              <input
                type="text"
                class="border p-2 w-full border-gray-200 rounded-lg"
                placeholder="MM/YY"
              />
            </div>
            <div class="w-full">
              <label class="block text-xs font-medium mb-2">CVV</label>
              <input
                type="text"
                class="border p-2 w-full border-gray-200 rounded-lg"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="border border-gray-200 p-6 rounded-lg w-full md:w-2/4">
        <p class="text-xl font-semibold mb-4">Order Summary</p>

        <div
          v-for="item in cart.items"
          :key="item.product.id"
          class="flex items-center justify-between mb-2"
        >
          <div class="flex items-center gap-4">
            <img
              :src="item.product.thumbnail"
              alt=""
              class="w-10 h-10 object-cover rounded"
            />
            <div>
              <p class="font-medium line-clamp-1">{{ item.product.title }}</p>
              <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
            </div>
          </div>
          <span>${{ (item.product.price * item.quantity).toFixed(2) }}</span>
        </div>

        <div class="border-t border-gray-200 mt-4 pt-4">
          <div class="flex justify-between">
            <span>Subtotal</span>
            <span>${{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div class="flex justify-between">
            <span>Tax</span>
            <span>${{ totalTax.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between font-semibold mt-2">
            <span>Total</span>
            <span>${{ totalPrice.toFixed(2) }}</span>
          </div>
        </div>

        <button
          @click="handleCompleteOrder"
          class="bg-gray-800 text-white w-full py-2 rounded mt-4 hover:bg-gray-700 duration-300 cursor-pointer"
        >
          Complete Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useCartStore } from "@/stores/cart-store";
import { useOrderHistoryStore } from "@/stores/order-history";
import { useAuthStore } from "@/stores/user-store";
import { computed, ref } from "vue";
import { toast } from "vue3-toastify";
import { onCheckoutOrders } from "../api/use-post-checkout";

const emit = defineEmits(["toggleSidebar"]);

const cart = useCartStore();
const orderStore = useOrderHistoryStore();
const authStore = useAuthStore();

const form = ref({
  firstName: authStore.user?.firstName ?? "",
  lastName: authStore.user?.lastName ?? "",
  email: authStore.user?.email ?? "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
});

const subtotal = computed(() =>
  cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
);

const handleCompleteOrder = async () => {
  try {
    // Constructing the checkout data
    const orderData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      address: form.value.address,
      city: form.value.city,
      state: form.value.state,
      zipCode: form.value.zipCode,
      products: cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      subtotal: subtotal.value,
      tax: totalTax.value,
      totalPrice: totalPrice.value,
      userId: authStore.user?.id,
    };

    const response = await onCheckoutOrders(orderData);
    orderStore.addOrder({
      id: Date.now(),
      date: new Date().toISOString(),
      products: [...cart.items],
      total: totalPrice.value,
      shipping: { ...form.value },
    });

    console.log("Order completed successfully:", response);
    router.push({
      path: "/cart",
      query: { toast: "Order completed successfully" },
    });
    cart.clearCart();
  } catch (error: any) {
    toast.error(error?.message || "Order failed");
    console.error("Order Failed", error);
  }
};
const taxRate = 0.1;
const totalTax = computed(() => subtotal.value * taxRate);
const totalPrice = computed(() => subtotal.value + totalTax.value);
</script>
