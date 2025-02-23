import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../helpers";
import { formatNameWithHyphens } from '../helpers/formatName';

export const signInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

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

  res.cookie("token", token, { httpOnly: true, maxAge: 8 * 60 * 60 * 1000 });

  return res.status(200).json({
    user: { id: user.id, email: user.email, name: user.name },
    token,
  });
};

export const signUpUser = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // ... other validation ...

  const formattedName = formatNameWithHyphens(name);

  // Use formattedName when creating the user
  const user = await prisma.user.create({
    data: {
      name: formattedName,
      email,
      password: bcrypt.hashSync(password, salt),
    },
  });

  // ... rest of the signup logic ...
};