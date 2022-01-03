import jwt from "jsonwebtoken";
import config from "../../config";
import passport from "passport";
import { Router } from "express";
import { AUTH_ENDPOINT } from "../../constants/endpoint";
import { ReqUser } from "../../types";

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
