import passport from "passport";
import { Router } from "express";
import { API_ENDPOINT } from "../../constants/endpoint";
import { ReqUser } from "../../types";

export const router: Router = Router();

router.get(
  API_ENDPOINT + "/",
  passport.authenticate("jwt"),
  (req: ReqUser, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({
        message: { message: `Enjoy your Pizza Time ${req.user.email}!` },
      });
    } catch (error) {
      console.log(error);
      let errorMessage;
      if (error instanceof Error) errorMessage = error.message;
      res.status(500).json({ message: "My code sucks", error: errorMessage });
    }
  }
);
