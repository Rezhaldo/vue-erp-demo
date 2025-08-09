import { APIClient } from "@shared/api";

// Type

import type { ParamAddProduct } from "../model/product-model";

export async function editProduct(value: ParamAddProduct, productId: string) {
  const body = {
    ...value,
  };

  const res = await APIClient.put({
    path: `/products/${productId}`,
    data: body,
  });

  if (res.error) {
    return Promise.reject(res.error);
  }

  return Promise.resolve(res.data);
}
