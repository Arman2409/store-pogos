import express from "express";

import { getInvetoryHandler } from "../handlers/sellerHandler";

const sellerRoute = express.Router();

sellerRoute.get("/invetory", getInvetoryHandler);

export default sellerRoute;
