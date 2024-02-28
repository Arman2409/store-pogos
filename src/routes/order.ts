import express from "express";

import {
  confirmOrderHandler,
  createOrderHandler,
  deleteOrderHandler,
  getOrderHandler
} from "../handlers/order";

const orderRoute = express.Router();

orderRoute.get("/:id", getOrderHandler)
orderRoute.get("/confirm/:id", confirmOrderHandler)
orderRoute.post("/", createOrderHandler)
orderRoute.delete("/:id", deleteOrderHandler)

export default orderRoute;