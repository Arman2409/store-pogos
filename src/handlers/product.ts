import type { Request, Response } from "express";
import type { Product } from "@prisma/client";

import handleError from "../helpers/handleError";
import { getSeller } from "../db/seller";
import {
    createProduct,
    deleteProduct,
    getProduct
} from "../db/product";

export const getProductHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params };
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const order = await getProduct(id);
        res.json(order);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const createProductHandler = async ({ body }: Request, res: Response) => {
    const { price = 0,
        name = "",
        category = "",
        sellerId = "",
        images = [] }: Product = { ...body };
    if (!price || !name || !category || !sellerId) return handleError(res, { message: "Name, price or category not provided" } as Error);
    try {
        const seller = await getSeller(sellerId);
        if (!seller) {
            return handleError(res, { message: "Seller doesn't exist" } as Error);
        }
        const product = await createProduct({
            sellerId,
            name,
            price,
            category,
            images,
            date: new Date(),
        })
        res.status(201).json(product);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const deleteProductHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params };
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        await deleteProduct(id);
        res.status(204).send();
    } catch (err) {
        return handleError(res, err as Error);
    }
}