import express from "express";

import {
  createClientHandler,
  deleteClientHandler,
  getClientHandler,
} from "../handlers/client";

const clientRoute = express.Router();

clientRoute.get("/:id", getClientHandler);
clientRoute.post("/", createClientHandler);
clientRoute.delete("/:id", deleteClientHandler)

export default clientRoute;
