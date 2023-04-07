import fetch from "node-fetch";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma, catchAsync } from "../../helpers";

const router = express.Router();

router.post(
  "/api/signup",
  catchAsync(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required." });
    }

    const salt = bcrypt.genSaltSync();

    let user;

    try {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password: bcrypt.hashSync(password, salt),
        },
      });
    } catch (err: any & { code?: string }) {
      if (err.code === "P2002") {
        return res.status(400).send({ message: "Email is already taken." });
      }
      console.error(err);
      return res.status(500).send({ message: "Internal server error." });
    }

    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        id: user.id,
        time: Date.now(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 8 * 60 * 60 });

    return res.status(201).send({
      user: { id: user.id, email: user.email, name: user.name },
      token,
    });
  })
);

export { router as signupRouter };
