import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import clinetRoute from "./routes/client";
import sellerRoute from "./routes/seller";
import discountsRoute from "./routes/discount";
import orderRoute from "./routes/order";
import productRoute from "./routes/product";
import logger from "./tools/logger";

const app = express();
dotenv.config();

const { PORT:port = 3000 } = {...process.env}

app.use(bodyParser.json());

// Routes 
app.use("/client", clinetRoute);
app.use("/seller", sellerRoute);
app.use("/discount", discountsRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute)

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});
