export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
  rating?: number;
  stock: number;
  tags: string[];
  discountPercentage?: number;
}

export interface Categories {
  slug: string;
  name: string;
  url: string;
}

export interface ParamAddProduct {
  brand: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  title: string;
}
