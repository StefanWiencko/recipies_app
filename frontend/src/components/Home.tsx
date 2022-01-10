import jwt_decode from "jwt-decode";
import { FC } from "react";
import { DecodedJwt } from "../utils/types";
import { Routes, Route, Link } from "react-router-dom";
import { RecipiesList } from "./RecipiesList";
import { NewRecipieForm } from "./NewRecipieForm";
import { SingleRecipie } from "./SingleRecipie";

export const Home: FC = () => {
  const jwt = localStorage.getItem("recipies_app_jwt") as string;
  const decodedJwt: DecodedJwt = jwt_decode(jwt);
  const logoutHandler = () => {
    localStorage.removeItem("recipies_app_jwt");
  };

  console.log("render");
  return (
    <div>
      <nav>
        <span>Logged as {decodedJwt.email}</span>
        {decodedJwt.role === "admin" && (
          <Link to="/new/recipies">Add new Recipies</Link>
        )}
        <Link to="/auth" onClick={logoutHandler}>
          Logout
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<RecipiesList />} />
          <Route path="/new/recipies" element={<NewRecipieForm />} />
          <Route path={`/recipie/*`} element={<SingleRecipie />} />
        </Routes>
      </main>
    </div>
  );
};
