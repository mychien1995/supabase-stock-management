export interface ProductModel {
  id: string;
  name: string;
  stock: number;
  size: number;
  brand: string;
  purposes: string[];
}

export interface ProductList {
  products: ProductModel[];
  total: number;
  currentPage: number;
}

export interface ActionResponse {
  open: boolean;
  success: boolean;
  text: string;
  error: string;
}
