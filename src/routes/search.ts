import express from "express";

import {
    searchProductsHandler,
    searchSellersHandler
} from "../handlers/search";

const searchRoute = express.Router();

searchRoute.post("/product", searchProductsHandler);
searchRoute.post("/seller", searchSellersHandler);

export default searchRoute;