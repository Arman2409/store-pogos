import { PrismaClient } from "@prisma/client";
import type { Order } from "../types/client";

const prisma = new PrismaClient();

export const getClient = async (id: string) => {
  return await prisma.client.findUnique({
    where: {
      id,
    },
  });
};

export const createClient = async (name: string, email: string) => {
  return await prisma.client.create({
    data: {
      name,
      email,
    },
  });
};

export const deleteClient = async (id:string) => {
  return await prisma.client.delete({
    where: {
      id
    },
  });
}

export const createOrder = async (order:Order) => {
  return await prisma.order.create({
    data: {
      ...order,
      products: {
        createMany: {
          data: order.products,
        }
      }  as any
    },
  });
};

export const deleteOrder = async (id:string) => {
  return await prisma.order.delete({
    where: {
      id
    },
  });
};

export const getOrders = async (id:string) => {
  return await prisma.order.findMany({
    where: {
      userId: id
    },
  });
};