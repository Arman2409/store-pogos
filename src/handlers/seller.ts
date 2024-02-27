import type { Request, Response } from "express";

import {
    createSeller,
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

export const createSellerHandler = async ({ body }: Request, res: Response) => {
    const { name = "" } = { ...body };
    if (!name) return handleError(res, { message: "Name not provided" } as Error);
    try {
        const seller = await createSeller(name);
        res.json(seller);
    } catch (err) {
        return handleError(res, err as Error);
    }
}