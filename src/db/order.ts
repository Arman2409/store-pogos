import { PrismaClient } from "@prisma/client";

import type { Order } from "../types/order";

const prisma = new PrismaClient();

export const getOrder = async (id: string) => {
  return await prisma.order.findUnique({
    where: {
      id
    },
  }).catch(({ meta, message }) => {
    throw new Error(meta?.message || message)
  }).finally(() => prisma.$disconnect());
};

export const createOrder = async (order: Order) => {
  return await prisma.order.create({
    data: {
      ...order,
      products: order.products as any
    },
  }).catch(({ meta, message }) => {
    throw new Error(meta?.message || message)
  }).finally(() => prisma.$disconnect());
};

export const deleteOrder = async (id: string) => {
  return await prisma.order.delete({
    where: {
      id
    },
  }).catch(({ meta, message }) => {
    throw new Error(meta?.message || message)
  }).finally(() => prisma.$disconnect());
};
