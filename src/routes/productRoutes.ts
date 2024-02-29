import express from "express";

import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
} from "../handlers/productHandler";

const productRoute = express.Router();

productRoute.get("/:id", getProductHandler);
productRoute.post("/", createProductHandler);
productRoute.delete("/:id", deleteProductHandler);

export default productRoute;
