import express from "express";

import { confirmSaleHandler, sendReceiptHandler } from "../handlers/sale";

const saleRoute = express.Router();

saleRoute.post("/", confirmSaleHandler)
saleRoute.post("/receipt", sendReceiptHandler)


export default saleRoute;