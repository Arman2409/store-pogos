import { PrismaClient } from "@prisma/client";
import handleDbError from "../helpers/handleDbError";

const prisma = new PrismaClient();

export const getInvetory = async () => {
  return await prisma.product
    .findMany()
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};
