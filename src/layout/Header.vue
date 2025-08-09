<template>
  <header
    class="bg-white shadow p-4 flex items-center transition-all duration-300"
  >
    <button
      @click="$emit('toggleSidebar')"
      aria-label="Toggle sidebar"
      class="text-2xl"
    >
      ☰
    </button>
  </header>
</template>
