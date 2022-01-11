import { FC, useContext } from "react";
import { useSearchParams, Navigate, Link } from "react-router-dom";
import { Recipies } from "../utils/types";
import { DataContext } from "./DataProvider";

export const SingleRecipie: FC = () => {
  const [searchParams] = useSearchParams();
  const data = useContext(DataContext)?.data;
  const recipieId = searchParams.get("id");
  let currRecipie: Recipies | undefined;
  if (recipieId !== null) {
    currRecipie = data?.find((el: Recipies) => el.id === parseInt(recipieId));
  }
  if (currRecipie === undefined) {
    return <Navigate to="/" />;
  }
  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  const recipieSteps = Object.keys(currRecipie.recipie);
  const separateNumbersAndCharacters = (string: string) => {
    const chars = string.slice(0, string.search(/\d/));
    const capitalizedChars = capitalizeFirstLetter(chars);
    const numbs = string.replace(chars, "");
    return capitalizedChars + " " + numbs;
  };
  return (
    <div className="singleRecipie">
      <div>
        <h2>{currRecipie.title}</h2>
      </div>
      <ul>
        {recipieSteps.map((step) => (
          <li className="step" key={step}>
            <strong>{separateNumbersAndCharacters(step)}</strong>
            <p>{currRecipie?.recipie[step]}</p>
          </li>
        ))}
      </ul>
      <Link className="='ternaryBtn btn" to="/">
        Back
      </Link>
    </div>
  );
};
