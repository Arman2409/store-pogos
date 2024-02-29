import { PrismaClient } from "@prisma/client";

import handleDbError from "../helpers/handleDbError";

const prisma = new PrismaClient();

export const getDiscount = async (id: string) => {
  return await prisma.discount
    .findUnique({
      where: {
        id,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const getDiscountsByProduct = async (id: string) => {
  return await prisma.discount
    .findMany({
      where: {
        productIds: {
          has: id,
        },
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const deleteDiscount = async (id: string) => {
  return await prisma.discount
    .delete({
      where: {
        id,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};
