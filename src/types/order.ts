import type { Product } from "./product";

export interface Order {
  clientId: string;
  date: Date;
  products: Product[];
}
