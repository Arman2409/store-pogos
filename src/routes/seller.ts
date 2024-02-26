import express from "express";
import { createSeller, getSeller } from "../db/seller";

const sellerRoute = express.Router();

type CreateSellerBody = {
  name: string;
};

sellerRoute.get("/:id", async ({ params }, res) => {
  const { id } = { ...params }
  if (!id) return res.status(400).json({ message: "Id not provided" });
  try {
    const seller = await getSeller(id);
    res.json(seller);
  } catch (err) {
    return res.status(400).json((err as Error).message);
  }
});

sellerRoute.post("/", async ({ body }, res) => {
  const { name }: CreateSellerBody = { ...body };
  if (!name) return res.status(400).json({ message: "Name not provided" });
  try {
    const seller = await createSeller(name);
    res.json(seller);
  } catch (err) {
    return res.status(400).json((err as Error).message);
  }
});

export default sellerRoute;
