import type { Request, Response } from "express";

import calculateTotalPrice from "./utils/calculateTotalPrice";
import handleErrorResponse from "../helpers/handleErrorResponse";
import generateDigitalReceipt from "./utils/generateDigitalReceipt";
import { sendDigitalReceipt } from "../tools/mailer";
import { createClient, getClient } from "../db/clientDb";
import { createSale, getSale } from "../db/saleDb";
import type { CreateSaleBody, SendReceiptBody } from "../types/sale";

export const createSaleHandler = async ({ body }: Request, res: Response) => {
  const {
    products = [],
    name = "",
    clientId = "",
    email = "",
  }: CreateSaleBody = { ...body };
  try {
    if (!clientId && (!name || !email)) {
      return handleErrorResponse(
        res,
        "ClientId or client details must be provided"
      );
    }
    if (!products.length)
      return handleErrorResponse(res, "Products not provided");
    let client;
    if (!clientId) {
      client = await createClient(name, email);
    } else {
      client = await getClient(clientId);
    }
    const sale = await createSale({
      clientId: clientId || (client?.id as string),
      totalPrice: calculateTotalPrice(products),
      date: new Date(),
    });
    res.status(201).json(sale);
  } catch (err) {
    handleErrorResponse(res, (err as Error)?.message);
  }
};

export const sendReceiptHandler = async ({ body }: Request, res: Response) => {
  const { saleId = "", email = "" }:SendReceiptBody = { ...body };
  if (!saleId || !email)
    return handleErrorResponse(res, "SaleId and email must be provided");
  try {
    const sale = getSale(saleId);
    if (!sale) return handleErrorResponse(res, "Sale with given Id doesn't exist");
    const { date = new Date(), totalPrice = 0, id = "" } = { ...sale };
    const template = generateDigitalReceipt(id, email, date, totalPrice);
    // send the receipt to client's email
    sendDigitalReceipt(email, template);
    res.status(201).send(template);
  } catch (err) {
    return handleErrorResponse(res, (err as Error)?.message);
  }
};
