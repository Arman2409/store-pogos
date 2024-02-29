import type { Request, Response } from "express";
import type { Product } from "@prisma/client";

import handleErrorResponse from "../helpers/handleErrorResponse";
import { createProduct, deleteProduct, getProduct } from "../db/productDb";

export const getProductHandler = async ({ params }: Request, res: Response) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    const order = await getProduct(id);
    res.json(order);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};

export const createProductHandler = async (
  { body }: Request,
  res: Response
) => {
  const {
    price = 0,
    name = "",
    category = "",
    images = [],
  }: Product = { ...body };
  if (!price || !name || !category)
    return handleErrorResponse(res, "Name, price or category not provided");
  try {
    const product = await createProduct({
      name,
      price,
      category,
      images,
      date: new Date(),
    });
    res.status(201).json(product);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};

export const deleteProductHandler = async (
  { params }: Request,
  res: Response
) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    await deleteProduct(id);
    res.status(204).send();
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};
