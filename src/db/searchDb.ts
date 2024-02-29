import { PrismaClient } from "@prisma/client";

import type {
  SearchClientsCriteria,
  SearchProductsCriteria,
} from "../types/search";
import handleDbError from "../helpers/handleDbError";

const prisma = new PrismaClient();

export const searchProducts = async (criteria: SearchProductsCriteria) => {
  return await prisma.product
    .findMany({
      where: criteria,
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const searchClients = async (criteria: SearchClientsCriteria) => {
  return await prisma.seller
    .findMany({
      where: criteria,
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};
