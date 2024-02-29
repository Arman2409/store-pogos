import type { Product } from "../../types/product";

const calculateTotalPrice = (products: Product[]) => {
  let totalPrice = 0;
  // calculate total price by price and weight of each product
  products.forEach(({ price, weight }: Product) => {
    totalPrice += price * (weight || 1);
  });
  return totalPrice;
};

export default calculateTotalPrice;
