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
        class="bg-white p-6 rounded-lg w-full max-w-md shadow-lg text-gray-800"
        @click.stop
      >
        <div class="mb-4">
          <h2 class="text-lg font-semibold">
            {{ isEdit ? "Edit" : "Add" }} Product
          </h2>
          <span class="text-gray-500"
            >{{ isEdit ? "Edit" : "Add" }} Product Information</span
          >
        </div>

        <label class="block text-sm font-medium text-gray-600 mb-1"
          >Title</label
        >
        <input
          v-model="localProduct.title"
          type="text"
          class="border p-2 rounded w-full mb-3 border-gray-200"
        />

        <label class="block text-sm font-medium mb-1">Description</label>
        <textarea
          v-model="localProduct.description"
          class="border p-2 rounded w-full mb-3 border-gray-200"
          rows="3"
        ></textarea>

        <div class="flex gap-4 mb-4">
          <div class="w-1/2">
            <label class="block text-sm font-medium mb-1">Price</label>
            <input
              v-model.number="localProduct.price"
              type="number"
              class="border p-2 rounded w-full border-gray-200"
            />
          </div>
          <div class="w-1/2">
            <label class="block text-sm font-medium mb-1">Stock</label>
            <input
              v-model.number="localProduct.stock"
              type="number"
              class="border p-2 rounded w-full border-gray-200"
            />
          </div>
        </div>

        <div v-if="!isEdit" class="flex gap-4 mb-4">
          <div class="w-1/2">
            <label class="block text-sm font-medium mb-1">Brand</label>
            <input
              v-model="localProduct.brand"
              class="border p-2 rounded w-full border-gray-200"
            />
          </div>
          <div class="w-1/2">
            <label class="block text-sm font-medium mb-1">Category</label>
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
        </div>

        <div class="flex justify-end mt-8">
          <button
            @click="saveChanges"
            class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 cursor-pointer"
            style="background-color: #369970"
          >
            {{ isEdit ? "Edit" : "Add" }} Product
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { computed, ref, watch } from "vue";
import { toast } from "vue3-toastify";
import { useGetCategories } from "../api/use-get-categories";
import { addProduct } from "../api/use-post-products";
import { editProduct } from "../api/use-put-product";
import type { ParamAddProduct, Product } from "../model/product-model";

const props = defineProps<{
  modelValue: boolean;
  product?: Product | null;
}>();
const selected = ref<{ value: string; label: string }>({
  value: "",
  label: "Select Category",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "save", product: Product): void;
}>();

const localProduct = ref<ParamAddProduct>({
  title: "",
  description: "",
  price: 0,
  stock: 0,
  category: "",
  brand: "",
});

const { categoryOptions } = useGetCategories();

// Watch for edit mode
const isEdit = computed(() => !!props.product?.id);

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      localProduct.value = {
        title: newProduct.title ?? "",
        description: newProduct.description ?? "",
        price: newProduct.price ?? 0,
        stock: newProduct.stock ?? 0,
        category: "",
        brand: "",
      };
    } else {
      localProduct.value = {
        title: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        brand: "",
      };
      selected.value = { value: "", label: "Select Category" };
    }
  },
  { immediate: true }
);

watch(
  () => selected.value,
  (newVal) => {
    localProduct.value.category = newVal.value;
  }
);

async function saveChanges() {
  try {
    if (isEdit.value && props.product?.id) {
      const updated = await editProduct(
        localProduct.value,
        String(props.product.id)
      );
      emit("save", updated);
      toast.success("Update Succes!");
    } else {
      const saved = await addProduct(localProduct.value);
      emit("save", saved);
      toast.success("New Product Added!");
    }

    emit("update:modelValue", false);
  } catch (err) {
    toast.error(err || "Failed to save product!");
  }
}
</script>
