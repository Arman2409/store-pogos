import type { Request, Response } from "express";

import {
    createSeller,
    deleteSeller,
    getInvetory,
    getSeller
} from "../db/seller";
import handleError from "../helpers/handleError";

export const getSellerHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params }
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const seller = await getSeller(id);
        res.json(seller);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const getInvetoryHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params };
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const seller = await getSeller(id);
        if(!seller) return handleError(res, { message: "Seller does not exist" } as Error);
        const products = await getInvetory(id) || [];
        res.json({
            count: products.length,
            products
        });
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const createSellerHandler = async ({ body }: Request, res: Response) => {
    const { name = "" } = { ...body };
    if (!name) return handleError(res, { message: "Name not provided" } as Error);
    try {
        const seller = await createSeller(name);
        res.status(201).json(seller);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const deleteSellerHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params }
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const seller = await deleteSeller(id);
        res.status(204).send();
    } catch (err) {
        return handleError(res, err as Error);
    }
}