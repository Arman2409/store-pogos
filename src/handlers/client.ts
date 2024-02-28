import type { Request, Response } from "express";

import {
    createClient,
    deleteClient,
    getClient,
} from "../db/client";
import handleError from "../helpers/handleError";

export const getClientHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params }
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        const client = await getClient(id);
        res.json(client);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const createClientHandler = async ({ body }: Request, res: Response) => {
    const { name = "", email = "" } = { ...body };
    if (!name || !email) return handleError(res, { message: "Name or email not provided" } as Error);
    try {
        const client = await createClient(name, email);
        res.status(201).json(client);
    } catch (err) {
        return handleError(res, err as Error);
    }
}

export const deleteClientHandler = async ({ params }: Request, res: Response) => {
    const { id = "" } = { ...params }
    if (!id) return handleError(res, { message: "Id not provided" } as Error);
    try {
        await deleteClient(id);
        res.status(204).send();
    } catch (err) {
        return handleError(res, err as Error);
    }
}