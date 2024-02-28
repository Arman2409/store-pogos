import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClient = async (id: string) => {
  return await prisma.client.findUnique({
    where: {
      id,
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  }).finally(() => prisma.$disconnect());
};

export const createClient = async (name: string, email: string) => {
  return await prisma.client.create({
    data: {
      name,
      email,
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  }).finally(() => prisma.$disconnect());
};

export const deleteClient = async (id:string) => {
  return await prisma.client.delete({
    where: {
      id
    },
  }).catch(({meta, message}) => {
    throw new Error(meta?.message || message)
  }).finally(() => prisma.$disconnect());
}

