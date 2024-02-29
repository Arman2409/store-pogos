import type { Request, Response } from "express";

export const notFoundHandler = async (_: Request, res: Response) => {
  return res.status(404).send("Resource not found");
};
