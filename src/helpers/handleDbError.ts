import type { PrismaError } from "../types/global";

const handleDbError = ({ meta, message }: PrismaError) => {
  let errMsg = meta?.message || message;
  if (errMsg.startsWith("\nInvalid")) {
    errMsg = "Invalid data provided";
  }
  throw new Error(errMsg);
};

export default handleDbError;
