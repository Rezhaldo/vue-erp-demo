import { APIClient } from "@shared/api";
import { onMounted, ref } from "vue";
import type { Product } from "../model/product-model";

async function getProductsList(param?: string) {
  const res = await APIClient.get(`/products${param ? `?${param}` : ""}`);
  if (res.error) {
    return Promise.resolve({ data: [] });
  }

  return Promise.resolve({ data: res.data });
}

export function useGetProductsList() {
  const products = ref<Product[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const { paramString } = useGenerateParams({
    limit: 100,
  });

  const formatCapitalize = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const fetchCategories = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await getProductsList(paramString);
      products.value = res.data.products || [];
    } catch (err: any) {
      error.value = err.message || "Failed to fetch products";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchCategories);

  return { products, isLoading, formatCapitalize };
}

function useGenerateParams({ page, limit, searchValue }: Props) {
  const params = new URLSearchParams();

  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());
  if (searchValue) params.append("q", searchValue);

  return { paramString: `?${params.toString()}` };
}

type Props = {
  page?: number;
  limit?: number;
  searchValue?: string;
};
