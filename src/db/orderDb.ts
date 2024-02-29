import { PrismaClient } from "@prisma/client";

import handleDbError from "../helpers/handleDbError";
import type { Order } from "../types/order";

const prisma = new PrismaClient();

export const getOrder = async (id: string) => {
  return await prisma.order
    .findUnique({
      where: {
        id,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const createOrder = async ({ products, ...rest }: Order) => {
  return await prisma.order
    .create({
      data: {
        ...rest,
        products: {
          createMany: {
            data: products,
          },
        },
      },
      include: {
        products: true,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const deleteOrder = async (id: string) => {
  return await prisma.order
    .delete({
      where: {
        id,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};
