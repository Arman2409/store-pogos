import { Client, PrismaClient } from "@prisma/client";

import handleDbError from "../helpers/handleDbError";

const prisma = new PrismaClient();

export const getClient = async (id: string) => {
  return await prisma.client
    .findUnique({
      where: {
        id,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const createClient = async (name: string, email: string) => {
  return await prisma.client
    .create({
      data: {
        name,
        email,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const updateClient = async (id: string, data: Client) => {
  return await prisma.client
    .update({
      where: {
        id,
      },
      data,
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};

export const deleteClient = async (id: string) => {
  return await prisma.client
    .delete({
      where: {
        id,
      },
    })
    .catch((err) => handleDbError(err))
    .finally(() => prisma.$disconnect());
};
