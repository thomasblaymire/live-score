import express, { Request, Response, NextFunction } from "express";

// Helper to catch async errors vs multiple try/catch blocks
export const catchAsync = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
