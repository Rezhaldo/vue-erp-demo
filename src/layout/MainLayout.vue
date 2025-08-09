<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <Sidebar :isSidebarOpen="isSidebarOpen" :navItems="navItems" />

    <!-- Overlay for mobile when sidebar is open -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black opacity-70 z-10 md:hidden"
      @click="toggleSidebar"
    ></div>

    <!-- Main Content -->
    <div
      class="flex-1 flex flex-col transition-all duration-300"
      :class="isSidebarOpen ? 'md:ml-64' : 'md:ml-0'"
    >
      <Header
        @toggleSidebar="toggleSidebar"
        :navItems="navItems"
        :title="currentLabel"
      />

      <main class="p-8 flex-1 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BuildingStorefrontIcon,
  ClockIcon,
  CubeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/outline";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Header from "./Header/Header.vue";
import Sidebar from "./Sidebar/Sidebar.vue";

const route = useRoute();

const isSidebarOpen = ref(true);

const currentLabel = computed(() => {
  const item = navItems.find((item) => item.path === route.path);
  return item?.label || "Page";
});

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: BuildingStorefrontIcon },
  { path: "/products", label: "Products", icon: CubeIcon },
  { path: "/shop", label: "Shop", icon: ShoppingBagIcon },
  { path: "/cart", label: "Cart", icon: ShoppingCartIcon },
  { path: "/order", label: "Order", icon: ClockIcon },
];

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>
