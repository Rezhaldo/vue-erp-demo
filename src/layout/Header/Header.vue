<template>
  <header class="bg-white shadow px-4 py-2 w-full">
    <div class="max-w-screen-xl w-full mx-auto flex items-center">
      <button
        class="flex items-start justify-center"
        style="width: 4rem"
        @click="$emit('toggleSidebar')"
      >
        <Bars3Icon class="h-6 w-6" />
      </button>

      <h1
        class="p-2 flex items-center justify-end rounded text-2xl font-bold"
        style="width: 100%"
      >
        {{ `${title} Menu` }}
      </h1>
    </div>
  </header>
</template>

<script setup>
import { Bars3Icon } from "@heroicons/vue/24/solid";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
