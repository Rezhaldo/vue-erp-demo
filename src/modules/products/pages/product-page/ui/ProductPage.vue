<template>
  <div class="mb-6 flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold">Products</h1>
      <span class="text-gray-600">Manage your product inventory</span>
    </div>
    <button
      @click="openAddModal()"
      style="background-color: #369970"
      class="flex text-white p-2 gap-x-4 items-center rounded-lg cursor-pointer hover:bg-gray-700 duration-300"
    >
      <PlusIcon class="w-4 h-4 text-gray-00" />
      Add Product
    </button>
  </div>

  <div class="flex items-center mb-6 gap-x-4">
    <div
      class="flex items-center border rounded border-gray-200 px-3 py-2 w-full focus-within:border-gray-800 focus-within:ring-2 focus-within:ring-gray-800"
    >
      <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search Products..."
        class="flex-grow ml-2 outline-none text-black focus:border-gray-800"
      />
    </div>
    <div class="relative w-full max-w-xs">
      <Listbox v-model="selected">
        <ListboxButton
          class="w-full border border-gray-300 rounded p-2 text-left cursor-pointer focus:border-gray-800 focus:ring-2 focus:ring-gray-800 focus:outline-none"
        >
          {{ selected.label }}
        </ListboxButton>

        <ListboxOptions
          class="absolute z-10 mt-1 w-full border py-2 border-gray-300 rounded bg-white shadow max-h-60 overflow-auto"
        >
          <ListboxOption
            v-for="option in categoryOptions"
            :key="option.value"
            :value="option"
            class="select-none p-2 mx-2 hover:bg-gray-200 rounded-xl"
          >
            {{ option.label }}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div
      v-for="product in filteredProducts"
      :key="product.id"
      class="border rounded p-4 border-gray-200"
    >
      <img :src="product.thumbnail" alt="" class="w-full object-cover mb-2" />
      <h2 class="font-semibold text-x line-clamp-1">
        {{ product.title }}
      </h2>
      <p class="text-gray-500 text-sm mb-2 line-clamp-2">
        {{ product.description }}
      </p>
      <div class="flex justify-between items-center mb-4">
        <p class="font-bold">${{ product.price }}</p>

        <p class="text-gray-600 flex items-center gap-x-1">
          <StarIcon class="w-5 h-5 text-yellow-300" />
          {{ product.rating }}
        </p>
      </div>
      <div class="flex items-center justify-between mb-4">
        <span class="bg-gray-100 py-0.5 px-2 rounded-4xl font-medium text-sm">{{
          product.tags?.length ? formatCapitalize(product.tags[0]) : "No Tag"
        }}</span>
        <span class="text-gray-600"> Stock: {{ product.stock }} </span>
      </div>
      <button
        @click="openEditModal(product)"
        class="border border-gray-200 p-2 w-fit rounded-lg cursor-pointer hover:bg-gray-100 mr-2"
      >
        <PencilSquareIcon class="w-5 h-5 text-gray-00" />
      </button>
      <button
        @click="handleDelete(product.id)"
        class="border border-gray-200 p-2 w-fit rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <TrashIcon class="w-5 h-5 text-gray-00" />
      </button>
    </div>

    <AddProductModal
      v-model="showModal"
      :product="editingProduct"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { PencilSquareIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { computed, ref } from "vue";
import { toast } from "vue3-toastify";
import { deleteProduct } from "../api/use-delete-product";
import { useGetCategories } from "../api/use-get-categories";
import { useGetProductsList } from "../api/use-get-products";
import AddProductModal from "../components/AddProductModal.vue";
import type { Product } from "../model/product-model";
import "./ProductPage.scss";

const emit = defineEmits(["toggleSidebar"]);
const searchQuery = ref("");
const selected = ref<{ value: string; label: string }>({
  value: "all",
  label: "All Categories",
});
const showModal = ref(false);
const editingProduct = ref<Product | null>(null);

const { categoryOptions } = useGetCategories();
const { products, formatCapitalize } = useGetProductsList();

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    const matchesCategory =
      selected.value.value === "all" ||
      product.category?.toLowerCase() === selected.value.value.toLowerCase();

    return matchesSearch && matchesCategory;
  });
});

const openAddModal = () => {
  editingProduct.value = null;
  showModal.value = true;
};

const openEditModal = (product: Product) => {
  editingProduct.value = product;
  showModal.value = true;
};

const handleDelete = async (productId: number) => {
  try {
    await deleteProduct(productId);

    const index = products.value.findIndex((p) => p.id === productId);
    if (index !== -1) {
      products.value.splice(index, 1);
    }

    toast.success("Product deleted successfully");
  } catch (err) {
    toast.error("Failed to delete product");
  }
};

const handleSave = (newProduct: Product) => {};
</script>
