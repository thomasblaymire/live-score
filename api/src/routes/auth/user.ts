import fetch from "node-fetch";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  email: string;
  name: string;
}

const router = express.Router();

router.get("/api/current-user", async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET) as User;
    const { id, name, email } = decodedUser;

    if (!decodedUser || !id || !email || !name) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = {
      name,
      id,
      email,
    };

    return res.json({ user });
  } catch (err) {
    console.error("Failed to verify JWT token:", err);
    return res.status(401).json({ error: "Not authorized" });
  }
});

export { router as currentUserRouter };
