import fetch from "node-fetch";
import express, { Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma, catchAsync } from "../../helpers";

const router = express.Router();

router.post(
  "/api/signin",
  catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required." });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !bcrypt.compareSync(password, user.password as string)) {
      return res.status(401).json({ error: "Email or password is wrong" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        time: Date.now(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 8 * 60 * 60 });

    return res.status(200).json({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  })
);

export { router as signinRouter };
