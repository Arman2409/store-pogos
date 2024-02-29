import type { Request, Response } from "express";

import handleErrorResponse from "../helpers/handleErrorResponse";
import { getInvetory } from "../db/sellerDb";

export const getInvetoryHandler = async (_: Request, res: Response) => {
  try {
    const products = await getInvetory();
    res.json({
      count: products.length,
      products,
    });
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};
