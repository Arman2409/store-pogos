import type { Request, Response } from "express";
import type { Order } from "@prisma/client";

import handleError from "../helpers/handleError";
import {
    createOrder,
    deleteOrder,
    getOrder
} from "../db/order";
import { getClient } from "../db/client";

export const createOrderHandler = async ({ body }: Request, res: Response) => {
    const { clientId, products }: Order = { ...body };
    console.log(body);

    if (!clientId || !products) return handleError(res, { message: "UserId or products not provided" } as Error);
    try {
        const client = await getClient(clientId);
        if (!client) {
            return handleError(res, { message: "Client doesn't exist" } as Error);
        }
        const order = await createOrder({
            clientId,
            date: new Date(),
            products
        })
        res.json(order);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const deleteOrderHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params };
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const deletedOrder = await deleteOrder(id);
        res.json(deletedOrder);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const getOrderHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params };
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const order = await getOrder(id);
        res.json(order);
    } catch (err) {
        return handleError(res, err as Error);
    }
}