export interface CartData {
  carts: CartItem[];
  total: number;
}

export interface CartItem {
  id: number;
  userId: number;
  products: Product[];
  total: number;
  totalProducts: number;
  totalQuantity: number;
  discountedTotal: number;
}
