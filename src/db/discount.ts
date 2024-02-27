import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDiscount = async (id: string) => {
  return await prisma.discount.findUnique({
    where: {
      id,
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  });
};

export const deleteDiscount = async (id: string) => {
  return await prisma.discount.delete({
    where: {
      id,
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  });
};

export const getDiscountsByProduct = async (id: string) => {
  return await prisma.discount.findMany({
    where: {
      productIds: {
        has: id
      }
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  });
};
