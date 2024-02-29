export interface Product {
  name: string;
  category: string;
  price: number;
  date: Date;
  images: string[];
  weight?: number;
}
