import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import logger from "./tools/logger";
import { notFoundHandler } from "./handlers/notFound";

import clientRoute from "./routes/client";
import sellerRoute from "./routes/seller";
import productRoute from "./routes/product";
import orderRoute from "./routes/order";
import saleRoute from "./routes/sale";
import searchRoute from "./routes/search";
import discountsRoute from "./routes/discount";

dotenv.config();

const { PORT = 3000 } = {...process.env}

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
