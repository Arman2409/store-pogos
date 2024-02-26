import express from "express";

import {
  createClient,
  createOrder,
  deleteClient,
  deleteOrder,
  getClient,
  getOrders
} from "../db/client";
import type { Order } from "../types/client";

const clinetRoute = express.Router();

type CreateClientBody = {
  name: string;
  email: string;
};

clinetRoute.get("/:id", async ({ params }, res) => {
  const { id } = { ...params }
  if (!id) return res.status(400).json({ message: "Id not provided" });
  try {
    const client = await getClient(id);
    res.json(client);
  } catch (err) {
    return res.status(400).json((err as Error).message);
  }
});

clinetRoute.post("/", async ({ body }, res) => {
  const { name, email }: CreateClientBody = { ...body };
  if (!name || !email) return res.status(400).json({ message: "Name or email not provided" });
  try {
    const client = await createClient(name, email);
    res.json(client);
  } catch (err) {
    return res.status(400).json((err as Error).message);
  }
});

clinetRoute.delete("/:id", async ({ params }, res) => {
  const { id } = { ...params }
  if (!id) return res.status(400).json({ message: "Id not provided" });
  try {
    const client = await deleteClient(id);
    res.json(client);
  } catch (err) {
    return res.status(400).json((err as Error).message);
  }
})

clinetRoute.post("/order", async ({ body }, res) => {
  const { userId, products }: Order = { ...body };
  if (!userId || !products) return res.status(400).json({ message: "UserId or products not provided" });
  try {
    const order = createOrder({
      userId,
      date: new Date(),
      products
    })
    res.json(order);
  } catch (err) {
    return res.status(400).json((err as Error).message);
  }
})

clinetRoute.delete("/order/:id", async ({ params }, res) => {
  const { id = "" } = { ...params };
  if (!id) return res.status(400).json({ message: "Id not provided" });
  try {
    const deletedOrder = deleteOrder(id);
    res.json(deletedOrder);
  } catch (err) {
    return res.status(400).json((err as Error).message);
  }
})

clinetRoute.get("/orders/:id", ({ params }, res) => {
  const { id = "" } = { ...params };
  if (!id) return res.status(400).json({ message: "Id not provided" });
  try {
    const orders = getOrders(id);
    res.json(orders);
  } catch (err) {
    return res.status(400).json((err as Error).message);
  }
})

export default clinetRoute;
