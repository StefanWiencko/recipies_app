import passport from "passport";
import { Router } from "express";
import { API_ENDPOINT } from "../../constants/endpoint";
import { ReqUser } from "../../types";
import { tokenCheck } from "../../middlewares/auth.mw";
import db from "../../db";
import { stringToJSON } from "../../utils/utilsFunctions";

export const router: Router = Router();

router.get(API_ENDPOINT + "/", tokenCheck, async (req: ReqUser, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const dbSearch = await db.recipies.findAllRecipies();
    const resolut = stringToJSON(dbSearch);
    res.json(resolut);
  } catch (error) {
    console.log(error);
    let errorMessage;
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: "My code sucks", error: errorMessage });
  }
});

router.post(API_ENDPOINT + "/new", tokenCheck, async (req: ReqUser, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { title, email, ...steps } = req.body;
    const refactoredObj = {
      title: title,
      email: email,
      recipie: JSON.stringify(steps),
    };
    await db.recipies.insertRecipie(refactoredObj);
    const dbSearch = await db.recipies.findAllRecipies();
    const resolut = stringToJSON(dbSearch);
    res.json(resolut);
  } catch (error) {
    console.log(error);
    let errorMessage;
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ message: "My code sucks", error: errorMessage });
  }
});
