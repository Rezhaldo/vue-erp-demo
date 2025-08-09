import { APIClient } from "@shared/api";

// Type

import type { ParamAddProduct } from "../model/product-model";

export async function addProduct(value: ParamAddProduct) {
  const body = {
    ...value,
  };

  const res = await APIClient.post({
    path: `/products/add`,
    data: body,
  });

  if (res.error) {
    return Promise.reject(res.error);
  }

  return Promise.resolve(res.data);
}
