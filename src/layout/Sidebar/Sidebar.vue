<template>
  <aside
    class="bg-gray-50 fixed top-0 left-0 z-20 h-screen text-black overflow-y-auto transition-all duration-300 flex flex-col"
    :class="isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full'"
  >
    <!-- Header -->
    <h1 class="text-xl font-semibold mb-6 flex gap-2 px-6 pt-6 line-clamp-1">
      <BriefcaseIcon class="h-6 w-6" />
      DummyJSON Store
    </h1>

    <!-- Navigation -->
    <span class="text-sm font-semibold text-gray-400 px-4"> Navigation </span>
    <nav class="mt-2 flex-1">
      <ul>
        <li v-for="item in navItems" :key="(item as NavItem).path">
          <router-link
            :to="(item as NavItem).path"
            class="flex items-center gap-2 hover:text-gray-700 hover:bg-gray-100 px-4 py-2"
          >
            <component :is="(item as NavItem).icon" class="h-5 w-5" />
            {{ (item as NavItem).label }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="mt-auto">
      <Menu as="div" class="relative w-full text-left p-4">
        <MenuButton class="sidebar-profile-button">
          <div class="flex items-center gap-2 px-4 justify-between">
            <img
              v-if="userImage"
              :src="userImage"
              alt="Profile"
              class="h-6 w-6 rounded-full object-cover"
            />
            <span class="font-semibold text-white">{{
              userName || "Guest"
            }}</span>
            <div class="flex px-2">
              <UserIcon class="h-5 w-5 text-white" />
            </div>
          </div>
        </MenuButton>

        <MenuItems>
          <MenuItem v-slot="{ active }">
            <router-link
              to="/account"
              class="block px-4 py-2 text-gray-700"
              :class="{ 'bg-gray-100': active }"
            >
              My Account
            </router-link>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <router-link
              to="/profile"
              class="block px-4 py-2 text-gray-700"
              :class="{ 'bg-gray-100': active }"
            >
              Profile
            </router-link>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <button
              @click="logout"
              :class="['sidebar-menu-button', { 'bg-gray-100': active }]"
            >
              <div>Logout</div>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { BriefcaseIcon, UserIcon } from "@heroicons/vue/24/outline";
import { defineEmits, defineProps, onMounted, ref } from "vue";
import "./Sidebar.scss";
const emit = defineEmits(["toggleSidebar"]);

// Props from parent:
interface NavItem {
  path: string;
  label: string;
  icon: any;
}

const { isSidebarOpen, navItems } = defineProps<{
  isSidebarOpen: boolean;
  navItems: NavItem[];
}>();

const userImage = ref<string | null>(null);
const userName = ref<string>("");

onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    userImage.value = user.image;
    // userName.value = `${user.firstName} ${user.lastName}`;
  }
});

function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  window.location.href = "/login";
}
</script>
