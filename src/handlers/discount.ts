import type { Request, Response } from "express";

import {
    deleteDiscount,
    getDiscount,
    getDiscountsByProduct
} from "../db/discount";
import handleError from "../helpers/handleError";

export const getDiscountHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params }
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const client = await getDiscount(id);
        res.json(client);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const getDiscountsByProductHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params }
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const client = await getDiscountsByProduct(id);
        res.json(client);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const deleteDiscountHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params }
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
       await deleteDiscount(id);
        res.status(204).send();
    } catch (err) {
        return handleError(res, err as Error);
    }
}
