import { Request, Response, NextFunction, RequestHandler } from "express";

interface AuthenticatedRequest extends Request {
  session?: {
    userId: string;
  };
}

export const verifyAuth: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.userId) {
    // User is authenticated, allow access
    next();
  } else {
    // Redirect to login page
    res.status(401).json({ message: "Authorization failed." });
  }
};
