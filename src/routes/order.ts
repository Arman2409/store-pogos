import express from "express";

import {
  createOrderHandler,
  deleteOrderHandler,
  getOrderHandler
} from "../handlers/order";

const orderRoute = express.Router();

orderRoute.post("/", createOrderHandler)
orderRoute.delete("/:id", deleteOrderHandler)
orderRoute.get("/:id", getOrderHandler)

export default orderRoute;