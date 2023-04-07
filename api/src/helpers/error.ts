import { Response } from "express";

type ErrorResponse = {
  error: string;
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string
) => {
  res.status(statusCode).json({ error: message } as ErrorResponse);
};
