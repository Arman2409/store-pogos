import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSeller = async (id: string) => {
  return await prisma.seller.findUnique({
    where: {
      id,
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message);
  }).finally(() => prisma.$disconnect());
};

export const createSeller = async (name: string) => {
  return await prisma.seller.create({
    data: {
      name,
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  }).finally(() => prisma.$disconnect());
};

export const getInvetory = async (sellerId:string) => {
  return await prisma.product.findMany({
    where: {
      sellerId
    }
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  }).finally(() => prisma.$disconnect());
}

export const deleteSeller = async (id:string) => {
  return await prisma.seller.delete({
    where: {
      id
    }
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  }).finally(() => prisma.$disconnect());
}