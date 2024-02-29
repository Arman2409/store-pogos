import type { Request, Response } from "express";
import type { Client } from "@prisma/client";

import handleErrorResponse from "../helpers/handleErrorResponse";
import {
  createClient,
  deleteClient,
  getClient,
  updateClient,
} from "../db/clientDb";

export const getClientHandler = async ({ params }: Request, res: Response) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    const client = await getClient(id);
    res.json(client);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};

export const createClientHandler = async ({ body }: Request, res: Response) => {
  const { name = "", email = "" }: Client = { ...body };
  if (!name || !email)
    return handleErrorResponse(res, "Name or email not provided");
  try {
    const client = await createClient(name, email);
    res.status(201).json(client);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};

export const updateClientHandler = async ({ body }: Request, res: Response) => {
  const { id = "", data = {} } = { ...body };
  if (!id) return handleErrorResponse(res, "Id not provided");
  if (Object.keys(data).length === 0)
    return handleErrorResponse(res, "No updated fields supplied");
  try {
    const updatedClient = await updateClient(id, data);
    res.json(updatedClient);
  } catch (err) {
    handleErrorResponse(res, (err as Error).message);
  }
};

export const deleteClientHandler = async (
  { params }: Request,
  res: Response
) => {
  const { id = "" } = { ...params };
  if (!id) return handleErrorResponse(res, "Id not provided");
  try {
    await deleteClient(id);
    res.status(204).send();
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};
