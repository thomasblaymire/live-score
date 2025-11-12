import { createClient } from "@supabase/supabase-js";
import { NextFunction, Request, RequestHandler, Response } from "express";

// Extend Express Request to include userId
export interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any;
}

// Initialize Supabase admin client (server-side only)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_KEY || "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Middleware to verify Supabase JWT token
 * Expects Authorization header with Bearer token
 */
export const verifyAuth: RequestHandler = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "No authentication token provided",
        message: "Please provide a valid authorization header",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    // Verify token with Supabase
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        error: "Invalid or expired token",
        message: error?.message || "Authentication failed",
      });
    }

    // Attach user info to request
    req.userId = user.id;
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth verification error:", error);
    return res.status(401).json({
      error: "Authentication failed",
      message: "An error occurred during authentication",
    });
  }
};
