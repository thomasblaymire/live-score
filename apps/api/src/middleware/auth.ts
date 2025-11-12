import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const verifyAuth: RequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No authentication token." });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    // Attach the userId to the request object
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};
