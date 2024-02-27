import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSeller = async (id: string) => {
  return await prisma.seller.findUnique({
    where: {
      id,
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message);
  });
};

export const createSeller = async (name: string) => {
  return await prisma.seller.create({
    data: {
      name,
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  });
};
