import express from "express";

import {
  createSellerHandler,
  getSellerHandler,
  getInvetoryHandler,
  deleteSellerHandler
} from "../handlers/seller";

const sellerRoute = express.Router();

sellerRoute.get("/:id", getSellerHandler);
sellerRoute.get("/invetory", getInvetoryHandler)
sellerRoute.post("/", createSellerHandler);
sellerRoute.delete("/:id", deleteSellerHandler)

export default sellerRoute;
