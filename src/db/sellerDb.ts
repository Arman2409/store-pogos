import { PrismaClient } from "@prisma/client";

import handleDbError from "../helpers/handleDbError";
import type { PrismaError } from "../types/global";

const prisma = new PrismaClient();

export const getInvetory = async () => {
  try {
    const products = await prisma.product.findMany();
    const sales = await prisma.sale.findMany();
    const orders = await prisma.order.findMany();
    return {
      products: products || [],
      orders: orders || [],
      sales: sales || [],
    };
  } catch (err) {
    handleDbError(err as PrismaError);
  } finally {
    () => prisma.$disconnect();
  }
};
