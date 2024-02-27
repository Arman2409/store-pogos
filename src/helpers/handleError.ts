import type { Response } from "express";

import logger from "../tools/logger";
import sliceString from "./sliceString";

const handleError = (res: Response, err: Error) => {    
    const { message = "Error occured" } = err;
    logger.error(sliceString(message, 100));
    return res.status(400).json({
        message: sliceString(message, 100),
    });
}

export default handleError;