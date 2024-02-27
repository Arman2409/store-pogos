import { PrismaClient } from "@prisma/client";

import type { Order } from "../types/order";

const prisma = new PrismaClient();

export const createOrder = async (order:Order) => {
    return await prisma.order.create({
      data: {
        ...order,
        products: {
          createMany: {
            data: order.products,
          }
        } as any
      },
    }).catch(({meta, message}) => {
      throw new Error(meta?.message || message)
    });
  };
  
  export const deleteOrder = async (id:string) => {
    return await prisma.order.delete({
      where: {
        id
      },
    }).catch(({meta, message}) => {
      throw new Error(meta?.message || message)
    });
  };
  
  export const getOrder = async (id:string) => {
    return await prisma.order.findMany({
      where: {
        id
      },
    }).catch(({meta, message}) => {
      throw new Error(meta?.message || message)
    });
  };