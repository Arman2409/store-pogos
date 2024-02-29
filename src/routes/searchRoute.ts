import express from "express";

import {
  searchClientsHandler,
  searchProductsHandler,
} from "../handlers/searchHandler";

const searchRoute = express.Router();

searchRoute.post("/product", searchProductsHandler);
searchRoute.post("/client", searchClientsHandler);

export default searchRoute;
