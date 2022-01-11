import jwt_decode from "jwt-decode";
import { FC, useContext, useEffect } from "react";
import { DecodedJwt } from "../utils/types";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { RecipiesList } from "./RecipiesList";
import { NewRecipieForm } from "./NewRecipieForm";
import { SingleRecipie } from "./SingleRecipie";
import axios from "axios";
import constants from "../constants";
import { DataContext } from "./DataProvider";

export const Home: FC = () => {
  useEffect(() => {
    if (!data && jwt) {
      axios
        .get(constants.baseUrl + "/api", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .then(() => navigate("/"))
        .catch((err) => {
          setData(false);
          navigate("/auth");
          console.log(err);
        });
    }
  });
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();

  const jwt = localStorage.getItem("recipies_app_jwt") as string;
  const decodedJwt: DecodedJwt = jwt_decode(jwt);
  const logoutHandler = () => {
    localStorage.removeItem("recipies_app_jwt");
  };
  return (
    <div className="container">
      <nav className="nav">
        <span>Logged as {decodedJwt.email}</span>
        <strong>Recipies App</strong>

        <div className="navBtns">
          {decodedJwt.role === "admin" && (
            <Link className="newRecipie link" to="/new/recipies">
              Add new Recipie
            </Link>
          )}
          <Link className="logout link" to="/auth" onClick={logoutHandler}>
            Logout
          </Link>
        </div>
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
