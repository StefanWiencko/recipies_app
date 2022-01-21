import { Router } from "express";
import { SERVER_STATUS_ENDPOINT } from "../../constants/endpoint";
import db from "../../db";
import { getRoutes } from "./server.status.service";

export const router: Router = Router();

// getStatus
router.get(SERVER_STATUS_ENDPOINT + "/", (req, res) => {
  res.status(200).send({
    status: "server is running",
  });
});

// getRoutes
router.get(SERVER_STATUS_ENDPOINT + "/routes", async (req, res) => {
  const routes = getRoutes();
  const data: any = await db.recipies.findAllRecipies();
  console.log(data);
  res.status(200).send({
    numberOfRoutes: routes.length,
    routes: routes,
  });
});
