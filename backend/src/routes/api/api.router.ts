import jwt from "jsonwebtoken";
import config from "../../config";
import { Router } from "express";
import { API_ENDPOINT } from "../../constants/endpoint";

export const router: Router = Router();

router.get(API_ENDPOINT + "/", (req, res) => {
  try {
    const bearerToken = req.headers.authorization?.split(" ");
    const token =
      bearerToken && bearerToken[0] === "Bearer" ? bearerToken[1] : null;
    if (!bearerToken || !token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const payload: any = jwt.verify(token, config.jwt.secret as string);
    res.json({
      message: { message: `Enjoy your Pizza Time ${payload.email}!` },
    });
  } catch (error) {
    console.log(error);
    let errorMessage;
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: "My code sucks", error: errorMessage });
  }
});
