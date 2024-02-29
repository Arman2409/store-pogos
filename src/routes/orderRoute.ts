import express from "express";

import {
  markOrderAsSoldHandler,
  createOrderHandler,
  deleteOrderHandler,
  getOrderHandler,
} from "../handlers/orderHandler";

const orderRoute = express.Router();

orderRoute.get("/:id", getOrderHandler);
orderRoute.get("/confirm/:id", markOrderAsSoldHandler);
orderRoute.post("/", createOrderHandler);
orderRoute.delete("/:id", deleteOrderHandler);

export default orderRoute;
