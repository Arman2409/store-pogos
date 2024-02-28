import type { Response } from "express";

import logger from "../tools/logger";
import sliceString from "./sliceString";

const handleError = (res: Response, err: Error, status:number = 400) => {    
    const { message = "Error occured" } = err;
    logger.error(message);
    return res.status(status).json({
        message: sliceString(message, 100),
    });
}

export default handleError;