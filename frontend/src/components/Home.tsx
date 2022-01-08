import { FC } from "react";
import jwt_decode from "jwt-decode";
import { DecodedJwt } from "../utils/types";

export const Home: FC = () => {
  const jwt = localStorage.getItem("recipies_app_jwt") as string;
  const decodedJwt: DecodedJwt = jwt_decode(jwt);
  console.log(decodedJwt);
  return (
    <div>
      <nav>
        {decodedJwt.role === "user" && <button>Add new recipie</button>}
        <span>Logged as {decodedJwt.email}</span>
      </nav>
      <main></main>
    </div>
  );
};
