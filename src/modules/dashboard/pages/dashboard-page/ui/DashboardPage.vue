<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div class="p-4 border rounded border-gray-200">
        <div class="flex justify-between">
          <h2 class="text-sm font-semibold">Total Products</h2>
          <ArchiveBoxIcon class="h-4 w-5" />
        </div>
        <p class="text-2xl font-bold">{{ totalProducts }}</p>
        <p class="text-gray-500 text-xs">Available in store</p>
      </div>

      <div class="p-4 border rounded border-gray-200">
        <div class="flex justify-between">
          <h2 class="text-sm font-semibold">Total Users</h2>
          <UsersIcon class="h-4 w-5" />
        </div>
        <p class="text-2xl font-bold">{{ totalUsers }}</p>
        <p class="text-gray-500 text-xs">Registered customers</p>
      </div>

      <div class="p-4 border rounded border-gray-200">
        <div class="flex justify-between">
          <h2 class="text-sm font-semibold">Active Carts</h2>
          <ShoppingCartIcon class="h-4 w-5" />
        </div>
        <p class="text-2xl font-bold">{{ totalCarts }}</p>
        <p class="text-gray-500 text-xs">Items in carts</p>
      </div>

      <div class="p-4 border rounded border-gray-200">
        <div class="flex justify-between">
          <h2 class="text-sm font-semibold">Total Revenue</h2>
          <ArrowTrendingUpIcon class="h-4 w-5" />
        </div>
        <p class="text-2xl font-bold">${{ totalRevenue.toFixed(2) }}</p>
        <p class="text-gray-500 text-xs">From all carts</p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid md:grid-cols-2 gap-4">
      <div class="p-4 border rounded border-gray-200">
        <h2 class="text-lg font-semibold">Products by Category</h2>
        <p class="text-gray-500 text-xs">
          Distribution of products across categories
        </p>
        <div class="w-full h-80">
          <Bar :data="barData" :options="barOptions" />
        </div>
      </div>

      <div class="p-4 border rounded border-gray-200">
        <h2 class="text-lg font-semibold">Category Distribution</h2>
        <p class="text-gray-500 text-xs">
          Pie chart view of product categories
        </p>
        <div class="w-full flex justify-center mt-4">
          <div class="h-80 w-80">
            <Pie :data="pieData" :options="pieOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { computed } from "vue";
import { Bar, Pie } from "vue-chartjs";

import { useGetUsersInfo } from "@/modules/authentication/pages/login/api/get-users";
import { useGetCartItems } from "@/modules/cart/pages/cart-list/api/use-get-cart";
import { useGetProductsList } from "@/modules/products/pages/product-page/api/use-get-products";

import {
  ArchiveBoxIcon,
  ArrowTrendingUpIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const pieOptions: ChartOptions<"pie"> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => {
          const total = (context.dataset.data as number[]).reduce(
            (sum, val) => sum + val,
            0
          );
          const value = context.parsed as number;
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return `${context.label}: ${percentage}`;
        },
      },
    },
  },
};

const barOptions = {
  responsive: true,
  plugins: { legend: { display: false }, title: { display: false } },
};

const { products } = useGetProductsList();
const { usersInfo } = useGetUsersInfo();
const { cartItem } = useGetCartItems();

const categories = ["beauty", "fragrances", "furniture", "groceries"];

const totalProducts = computed(() => products.value.length || 0);
const totalUsers = computed(() => usersInfo.value.users?.length || 0);
const totalCarts = computed(() => cartItem.value.carts?.length || 0);
const totalRevenue = computed(
  () => cartItem.value.carts?.reduce((sum, cart) => sum + cart.total, 0) || 0
);

const categoryStats = computed(() => {
  const counts = categories.map(
    (cat) => products.value.filter((p) => p.category === cat).length
  );
  const total = products.value.length || 1;
  const percentages = counts.map((count) => (count / total) * 100);
  return { counts, percentages };
});

const barData = computed(() => ({
  labels: categories,
  datasets: [
    {
      label: "Products",
      backgroundColor: "rgba(106, 90, 205, 0.6)",
      data: categoryStats.value.counts,
    },
  ],
}));

const pieData = computed(() => ({
  labels: categories,
  datasets: [
    {
      backgroundColor: ["#36A2EB", "#4BC0C0", "#FFCE56", "#FF6384"],
      data: categoryStats.value.counts,
    },
  ],
}));
</script>
