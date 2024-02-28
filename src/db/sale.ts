import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSale = async (id: string) => {
    return await prisma.sale.findUnique({
        where: {
            id
        },
    }).catch(({ meta, message }) => {
        throw new Error(meta?.message || message)
    }).finally(() => prisma.$disconnect());
};

export const createSale = async (sale: any) => {
    return await prisma.sale.create({
        data: sale,
    }).catch(({ meta, message }) => {
        throw new Error(meta?.message || message)
    }).finally(() => prisma.$disconnect());
};