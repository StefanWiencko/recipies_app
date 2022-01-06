import passport from "passport";
import { Request, Response, NextFunction } from "express";
export const tokenCheck = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      next(err);
    }
    if (info) {
      return res.status(401).json({ message: info.message });
    }
    if (!user) {
      return res.status(401).json({ message: "Redirect to login" });
    }
    req.user = user;
    next();
  })(req, res, next);
};
