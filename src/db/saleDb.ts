import { PrismaClient } from "@prisma/client";

import handleDbError from "../helpers/handleDbError";
import type { Sale } from "../types/sale";

const prisma = new PrismaClient();

export const getSale = async (id: string) => {
  return await prisma.sale
    .findUnique({
      where: {
        id,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const createSale = async (sale: Sale) => {
  return await prisma.sale
    .create({
      data: sale,
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};
