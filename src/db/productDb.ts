import { PrismaClient } from "@prisma/client";

import handleDbError from "../helpers/handleDbError";
import type { Product } from "../types/product";

const prisma = new PrismaClient();

export const createProduct = async (product: Product) => {
  return await prisma.product
    .create({
      data: {
        ...product,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const deleteProduct = async (id: string) => {
  return await prisma.product
    .delete({
      where: {
        id,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const getProduct = async (id: string) => {
  return await prisma.product
    .findMany({
      where: {
        id,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};
