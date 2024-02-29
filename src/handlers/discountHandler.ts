import type { Request, Response } from "express";

import handleErrorResponse from "../helpers/handleErrorResponse";
import {
  deleteDiscount,
  getDiscount,
  getDiscountsByProduct,
} from "../db/discountDb";

export const getDiscountHandler = async (
  { params }: Request,
  res: Response
) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    const client = await getDiscount(id);
    res.json(client);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};

export const getDiscountsByProductHandler = async (
  { params }: Request,
  res: Response
) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    const client = await getDiscountsByProduct(id);
    res.json(client);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};

export const deleteDiscountHandler = async (
  { params }: Request,
  res: Response
) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    await deleteDiscount(id);
    res.status(204).send();
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};
