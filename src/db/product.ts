import { PrismaClient } from "@prisma/client";

import type { Product } from "../types/product";

const prisma = new PrismaClient();

export const createProduct = async (product: Product) => {
    return await prisma.product.create({
        data: {
            ...product
        },
    }).catch(({ meta, message }) => {
        throw new Error(meta?.message || message)
    }).finally(() => prisma.$disconnect());
};

export const deleteProduct = async (id: string) => {
    return await prisma.product.delete({
        where: {
            id
        },
    }).catch(({ meta, message }) => {
        throw new Error(meta?.message || message)
    }).finally(() => prisma.$disconnect());
};

export const getProduct = async (id: string) => {
    return await prisma.product.findMany({
        where: {
            id
        },
    }).catch(({ meta, message }) => {
        throw new Error(meta?.message || message)
    }).finally(() => prisma.$disconnect());
};