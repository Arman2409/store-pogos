import type { Product } from "./product";

export interface Sale {
  clientId: string;
  totalPrice: number;
  date: Date;
}

export type CreateSaleBody = {
  products: Product[];
  name: string;
  clientId: string;
  email: string;
};

export type SendReceiptBody = {
  email: string
  saleId: string
}