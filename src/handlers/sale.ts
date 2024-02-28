import type { Request, Response } from "express";

import handleError from "../helpers/handleError";
import { createClient, getClient } from "../db/client";
import { createSale, getSale } from "../db/sale";
import generateDigitalReceipt from "./utils/generateDigitalReceipt";
import { sendDigitalReceipt } from "../tools/mailer";

export const confirmSaleHandler = async ({ body }: Request, res: Response) => {
    const {
        products = "",
        name = "",
        clientId = "",
        sellerId = "",
        email = "",
        } = { ...body }
    try {
        if (!clientId && (!name || !email)) {
            return handleError(res, { message: "ClientId or client details must be provided" } as Error);
        }
        let client;
        if (!clientId) {
             client = await createClient(name, email);
        } else {
             client = await getClient(clientId);
        }
        let totalPrice = 0;
        products.forEach(({price, weight}:any) => {
             totalPrice += price * weight;
        })
        const sale = await createSale({
            clientId: clientId || client?.id, 
            sellerId,
            totalPrice,
            date: new Date()
        })
        res.status(201).json(sale);
    } catch (err) {
        handleError(res, err as Error);
    }
};

export const sendReceiptHandler = async ({ body }: Request, res: Response) => {
    const { saleId = "",
        email = "" } = { ...body };
    if (!saleId ||
        !email) {
        return handleError(res, { message: "SaleId and customerEmail must be provided" } as Error);
    }
    try {
        const sale = getSale(saleId);
        if (!sale) return handleError(res, { message: "Sale with given Id doesn't exist" } as Error);
        const { date = new Date() , totalPrice = 0, id = ""  } = { ...sale };
        const template = generateDigitalReceipt(id, email, date, totalPrice);
        sendDigitalReceipt(email, template);
        res.status(201).send(template);
    } catch (err) {
        return handleError(res, err as Error);
    }
}