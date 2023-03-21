import fetch from "node-fetch";
import express, { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
import { prisma } from "../../helpers/prisma";
import { catchAsync } from "../../helpers/async";

const router = express.Router();

router.post(
  "/api/signin",
  catchAsync(async (req: Request, res: Response) => {
    console.log(req);
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && bcrypt.compareSync(password, user.password as string)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          time: Date.now(),
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "8h",
        }
      );

      console.log(
        "coookiiieee",
        cookie.serialize("LIVE_SCORE_ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("LIVE_SCORE_ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );

      res.json(user);
    } else {
      res.status(401);
      res.json({ error: "Email or password is wrong" });
    }
  })
);

export { router as signinRouter };
