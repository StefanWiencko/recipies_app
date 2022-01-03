import passport from "passport";
import PassportLocal from "passport-local";
import PassportJWT from "passport-jwt";
import db from "../db";
import { Application } from "express";
import { UsersTable } from "../db/models";
import { compareHash } from "../utils/hashFunctions";
import { Payload } from "../types";
import config from "../config";

export const configurePassport = (app: Application) => {
  passport.serializeUser((user: UsersTable, done) => {
    if (user.password) {
      delete user.password;
    }
    done(null, user);
  });
  passport.deserializeUser((user: UsersTable, done) => done(null, user));
  passport.use(
    new PassportLocal.Strategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const [userFound] = await db.users.find("email", email);
          if (userFound.password && compareHash(password, userFound.password)) {
            delete userFound.password;
            done(null, userFound);
          } else {
            done(null, false);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    new PassportJWT.Strategy(
      {
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret,
      },
      (payload: Payload, done) => {
        try {
          done(null, payload);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  app.use(passport.initialize());
};
