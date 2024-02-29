import express from "express";

import { createSaleHandler, sendReceiptHandler } from "../handlers/saleHandler";

const saleRoute = express.Router();

saleRoute.post("/", createSaleHandler);
saleRoute.post("/receipt", sendReceiptHandler);

export default saleRoute;
