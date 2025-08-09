import { APIClient } from "@shared/api";
import { computed, onMounted, ref } from "vue";
import type { Categories } from "../model/product-model";

async function getCategories(param?: string) {
  const res = await APIClient.get(
    `/products/categories${param ? `?${param}` : ""}`
  );
  if (res.error) {
    return Promise.resolve({ data: [] });
  }

  return Promise.resolve({ data: res.data });
}

export function useGetCategories() {
  const categories = ref<Categories[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const fetchCategories = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await getCategories();

      categories.value = res.data;

      console.log("Fetched categories:", categories.value);
    } catch (err: any) {
      error.value = err.message || "Failed to fetch categories";
    } finally {
      isLoading.value = false;
    }
  };

  const categoryOptions = computed(() => [
    { value: "all", label: "All Categories" },
    ...categories.value.map((cat) => ({
      value: cat.slug,
      label: cat.name,
    })),
  ]);

  onMounted(fetchCategories);

  return { categories, categoryOptions, isLoading };
}
