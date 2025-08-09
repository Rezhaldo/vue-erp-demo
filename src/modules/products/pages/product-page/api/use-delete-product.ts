import { APIClient } from "@shared/api";

// Type

export async function deleteProduct(productId: number) {
  const response = await APIClient.deleteData(`/products/${productId}`);

  if (response.error) {
    return Promise.reject(response.error);
  }

  return Promise.resolve(response.data);
}
