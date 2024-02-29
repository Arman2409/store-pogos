import express from "express";

import {
  createClientHandler,
  deleteClientHandler,
  getClientHandler,
  updateClientHandler,
} from "../handlers/clientHandler";

const clientRoute = express.Router();

clientRoute.get("/:id", getClientHandler);
clientRoute.post("/", createClientHandler);
clientRoute.patch("/", updateClientHandler);
clientRoute.delete("/:id", deleteClientHandler);

export default clientRoute;
