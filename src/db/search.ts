import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const searchProducts = async (criteria:any) => {
    return await prisma.product.findMany({
        where: criteria
    }).catch(({ meta, message }) => {
        throw new Error(meta?.message || message)
    }).finally(() => prisma.$disconnect());
};

export const searchSellers = async (name:string) => {
    return await prisma.seller.findMany({
        where: {
           name
        },
    }).catch(({ meta, message }) => {
        throw new Error(meta?.message || message)
    }).finally(() => prisma.$disconnect());
};