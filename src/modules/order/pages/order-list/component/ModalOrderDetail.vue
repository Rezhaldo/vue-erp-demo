<template>
  <Transition
    enter-active-class="duration-100 ease-out"
    enter-from-class="opacity-0 "
    enter-to-class="opacity-100 "
    leave-active-class="duration-150 ease-in"
    leave-from-class="opacity-100 "
    leave-to-class="opacity-0 "
  >
    <div
      v-if="modelValue"
      @click="$emit('update:modelValue', false)"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 duration-300"
    >
      <div
        class="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg text-gray-800"
        @click.stop
      >
        <h2 class="text-lg font-semibold mb-4">
          Order #{{ order?.id }} Details
        </h2>

        <!-- Order Date -->
        <p class="text-sm text-gray-500 mb-4">
          Order placed on {{ new Date(order?.date ?? "").toLocaleDateString() }}
        </p>

        <!-- Order Status & Total Amount -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex flex-col space-y-2">
            <span class="font-semibold">Order Status</span>
            <span
              class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold"
            >
              completed
            </span>
          </div>
          <div class="flex flex-col space-y-2 items-center">
            <span class="text-xl font-bold">Total Amount</span>
            <span class="text-xl font-bold"
              >${{ order?.total.toFixed(2) }}</span
            >
          </div>
        </div>

        <!-- Order Products (Images in Row) -->
        <h3 class="font-semibold mb-2">Items Ordered</h3>
        <div class="flex gap-4 mb-4 flex-wrap">
          <div
            v-for="item in order?.products"
            :key="item.product.id"
            class="flex items-center gap-3 w-32"
          >
            <img
              :src="item.product.thumbnail"
              alt="Product Thumbnail"
              class="w-16 h-16 object-cover rounded"
            />
          </div>
        </div>

        <!-- Shipping Info -->
        <h3 class="font-medium mt-4 mb-2">Shipping Information</h3>
        <div class="bg-gray-100 p-3 rounded text-sm">
          <p class="font-medium text-lg">
            {{ order?.shipping.firstName }} {{ order?.shipping.lastName }}
          </p>
          <p class="font-medium text-lg">{{ order?.shipping.address || "" }}</p>
          <p class="font-medium text-lg mb-2">
            {{
              order?.shipping.city
                ? `${order.shipping.city || ""}, ${
                    order.shipping.state || ""
                  } ${order.shipping.zipCode || ""}`
                : ""
            }}
            {{ order?.shipping.zipCode || "" }}
          </p>
          <p class="text-gray-500">Email: {{ order?.shipping.email }}</p>
          <p class="text-gray-500" v-if="order?.shipping.phone">
            Phone: {{ order?.shipping.phone }}
          </p>
        </div>

        <!-- Close Button -->
        <div class="flex justify-end mt-4">
          <button
            @click="$emit('update:modelValue', false)"
            class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 cursor-pointer"
            style="background-color: #42b883"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { OrderData } from "@/stores/order-history";
import { defineProps } from "vue";

const props = defineProps<{
  modelValue: boolean; // v-model for modal visibility
  order: OrderData | null; // Order data passed in
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>
