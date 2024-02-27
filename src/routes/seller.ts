import express from "express";

import {
  createSellerHandler,
  getSellerHandler
} from "../handlers/seller";

const sellerRoute = express.Router();

sellerRoute.get("/:id", getSellerHandler);
sellerRoute.post("/", createSellerHandler);

export default sellerRoute;
