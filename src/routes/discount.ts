import express from "express";

import {
    deleteDiscountHandler,
    getDiscountHandler,
    getDiscountsByProductHandler
} from "../handlers/discount";

const discountRoute = express.Router();

discountRoute.get("/:id", getDiscountHandler);
discountRoute.get("/product/:id", getDiscountsByProductHandler);
discountRoute.delete("/:id", deleteDiscountHandler);

export default discountRoute;
