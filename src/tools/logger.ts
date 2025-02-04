import { format, createLogger, transports } from "winston";

import sliceString from "../helpers/sliceString";

// Define log format
const logFormat = format.combine(
  format.timestamp(),
  format.simple(),
  format.colorize(),
  format.printf(
    (info) =>
      `[${sliceString(info.timestamp, 16, false)}] ${info.level}: ${
        info.message
      }`
  )
);

// Create a Winston logger instance
const logger = createLogger({
  format: logFormat,
  transports: [
    new transports.Console(), // Output to console
    new transports.File({ filename: "./logs/error.log", level: "error" }), // Output error to a file
    new transports.File({ filename: "./logs/info.log", level: "info" }), // Output info to a file
  ],
});

export default logger;
