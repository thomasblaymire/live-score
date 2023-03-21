import express, { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
import { prisma } from "../../helpers/prisma";
import { catchAsync } from "../../helpers/async";

const router = express.Router();

router.post(
  "/api/signup",
  catchAsync(async (req: Request, res: Response) => {
    const salt = bcrypt.genSaltSync();
    const { email, password, name } = req.body;

    console.log("debug", { email, password, name });

    let user;

    try {
      user = await prisma.user.create({
        data: {
          email,
          password: bcrypt.hashSync(password, salt),
          name,
        },
      });
    } catch (err) {
      res.status(401);
      res.json({ error: "User already exists" });
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
        password: user.id,
        time: Date.now(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Sets cookie on browser
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("LIVE_SCORE_ACCESS_TOKEN", token, {
        httpOnly: true, // not accessible by JS
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res.json(user);
  })
);

export { router as signupRouter };
