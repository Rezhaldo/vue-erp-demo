import { APIClient } from "@shared/api";

// Type
import type { CheckoutParamData } from "../model/checkout";

export async function onCheckoutOrders(value: CheckoutParamData) {
  const body = {
    ...value,
  };

  const res = await APIClient.post({
    path: `/carts/add`,
    data: body,
  });

  if (res.error) {
    return Promise.reject(res.error);
  }

  return Promise.resolve(res.data);
}
