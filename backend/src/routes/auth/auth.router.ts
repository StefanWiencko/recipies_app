import db from "../../db";
import jwt from "jsonwebtoken";
import config from "../../config";
import { Router } from "express";
import { AUTH_ENDPOINT } from "../../constants/endpoint";
import { compareHash } from "../../utils/hashFunctions";

export const router: Router = Router();

router.post(AUTH_ENDPOINT + "/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const [userFound] = await db.users.find("email", email);
    if (userFound && compareHash(password, userFound.password)) {
      const token = jwt.sign(
        {
          userId: userFound.id,
          email: userFound.email,
          role: userFound.role,
        },
        config.jwt.secret as string,
        { expiresIn: "15d" }
      );
      return res.json(token);
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "My code sucks" });
  }
});
