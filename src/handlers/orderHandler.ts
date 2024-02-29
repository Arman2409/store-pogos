import type { Request, Response } from "express";

import handleErrorResponse from "../helpers/handleErrorResponse";
import calculateTotalPrice from "./utils/calculateTotalPrice";
import { createOrder, deleteOrder, getOrder } from "../db/orderDb";
import { getClient } from "../db/clientDb";
import { createSale } from "../db/saleDb";
import type { Order } from "../types/order";

export const getOrderHandler = async ({ params }: Request, res: Response) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    const order = await getOrder(id);
    res.json(order);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};

export const createOrderHandler = async ({ body }: Request, res: Response) => {
  const { clientId, products }: Order = { ...body };
  if (!clientId || !products?.length)
    return handleErrorResponse(res, "ClientId or products not provided");
  try {
    const client = await getClient(clientId);
    if (!client) {
      return handleErrorResponse(res, "Client doesn't exist");
    }
    const order = await createOrder({
      clientId,
      date: new Date(),
      products,
    });
    res.status(201).json(order);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};

export const markOrderAsSoldHandler = async (
  { params }: Request,
  res: Response
) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    // Check if order exists
    const order = getOrder(id);
    if (!order) return handleErrorResponse(res, "Order doesn't exist");
    const { clientId, products }: Order = { ...((order as any) || {}) };
    const sale = createSale({
      clientId,
      date: new Date(),
      totalPrice: calculateTotalPrice(products),
    });
    res.status(201).send(sale);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};

export const deleteOrderHandler = async (
  { params }: Request,
  res: Response
) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    await deleteOrder(id);
    res.status(204).send();
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};
