import type { Response } from "express";

import logger from "../tools/logger";
import sliceString from "./sliceString";

const handleErrorResponse = (res: Response, message: string, status = 400) => {
  logger.error(message || "Error occured");
  // Send error response
  return res.status(status).json({
    message: sliceString(message, 100),
  });
};

export default handleErrorResponse;
