import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import logger from "./tools/logger";
import { notFoundHandler } from "./handlers/notFoundHandler";

import clientRoute from "./routes/clientRoute";
import sellerRoute from "./routes/sellerRoute";
import productRoute from "./routes/productRoute";
import orderRoute from "./routes/orderRoute";
import saleRoute from "./routes/saleRoute";
import searchRoute from "./routes/searchRoute";
import discountsRoute from "./routes/discountRoute";

dotenv.config();

const { PORT = 3000 } = { ...process.env };

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/client", clientRoute);
app.use("/seller", sellerRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/sale", saleRoute);
app.use("/search", searchRoute);
app.use("/discount", discountsRoute);
app.use("*", notFoundHandler);

app.listen(PORT, () => {
  logger.info(`App listening on port ${PORT}`);
});
