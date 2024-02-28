import type { Request, Response } from "express";

import handleError from "../helpers/handleError";

import {
    searchProducts,
    searchSellers,
} from "../db/search";
import updateSearchCriteria from "./utils/updateSearchCriteria";

type SearchProductCriteria = {
    priceRange?: [number | null, number | null]
    name?: string
    category?: string
}

export const searchProductsHandler = async ({ body }: Request, res: Response) => {
    const { priceRange, name, category }: SearchProductCriteria = { ...body }
    try {
        if (!name && !category && !priceRange) {
            return handleError(res, { message: "Please provide search details" } as Error);
        }
        const criteria = updateSearchCriteria(priceRange, name, category)
        let products = await searchProducts(criteria);
        //If no results for the given parameters, send an empty array instead of undefined.
        res.status(200).json(products || []);
    } catch (err) {
        handleError(res, err as Error);
    }
};

export const searchSellersHandler = async ({ body }: Request, res: Response) => {
    const { name }: SearchProductCriteria = { ...body }
    try {
        if (!name) {
            return handleError(res, { message: "Please provide criteria" } as Error);
        }
        let sellers = await searchSellers(name);
        //If no results for the given parameters, send an empty array instead of undefined.
        res.status(200).json(sellers || []);
    } catch (err) {
        handleError(res, err as Error);
    }
}
