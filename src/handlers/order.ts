import type { Request, Response } from "express";
import type { Order } from "@prisma/client";

import handleError from "../helpers/handleError";
import {
    createOrder,
    deleteOrder,
    getOrder
} from "../db/order";
import { getClient } from "../db/client";

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

export const createOrderHandler = async ({ body }: Request, res: Response) => {
    const {
        clientId,
        sellerId,
        products 
    }: Order = { ...body };
    if (!clientId || !sellerId || !products?.length) return handleError(res, { message: "ClientId, userId or products not provided" } as Error);
    try {
        const client = await getClient(clientId);
        if (!client) {
            return handleError(res, { message: "Client doesn't exist" } as Error);
        }
        const order = await createOrder({
            clientId,
            sellerId,
            date: new Date(),
            products
        })
        res.status(201).json(order);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const confirmOrderHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params };
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const order = getOrder(id);
        
        res.status(204).send();
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const deleteOrderHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params };
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        await deleteOrder(id);
        res.status(204).send();
    } catch (err) {
        return handleError(res, err as Error);
    }
}