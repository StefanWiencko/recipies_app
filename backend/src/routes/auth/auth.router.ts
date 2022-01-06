import jwt from "jsonwebtoken";
import config from "../../config";
import passport from "passport";
import { Router } from "express";
import { AUTH_ENDPOINT } from "../../constants/endpoint";
import { ReqUser } from "../../types";
import { generateHash } from "../../utils/hashFunctions";
import db from "../../db";
export const router: Router = Router();

router.post(
  AUTH_ENDPOINT + "/login",
  passport.authenticate("local"),
  async (req: ReqUser, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        {
          userId: req.user.id,
          email: req.user.email,
          role: req.user.role,
        },
        config.jwt.secret as string,
        { expiresIn: "15d" }
      );
      res.json(token);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "My code sucks" });
    }
  }
);

router.post(AUTH_ENDPOINT + "/register", async (req, res) => {
  const newUser = req.body;
  try {
    newUser.password = generateHash(newUser.password);
    const resolut = await db.users.insert(newUser);

    const token = jwt.sign(
      {
        userId: resolut.insertId,
        email: newUser.email,
        role: newUser.role,
      },
      config.jwt.secret as string,
      { expiresIn: "15d" }
    );
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "My code sucks" });
  }
});
