import { FC, useContext } from "react";
import { useSearchParams, Navigate, Link } from "react-router-dom";
import { RecipiesInterface } from "../utils/types";
import { DataContext } from "./DataProvider";

export const SingleRecipie: FC = () => {
  const [searchParams] = useSearchParams();
  const data = useContext(DataContext)?.data;
  const recipieId = searchParams.get("id");
  let currRecipie: RecipiesInterface | undefined;
  if (recipieId !== null) {
    currRecipie = data?.find(
      (el: RecipiesInterface) => el.id === parseInt(recipieId)
    );
  }
  if (currRecipie === undefined) {
    return <Navigate to="/" />;
  }
  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const recipieSteps = Object.keys(currRecipie.recipie);
  return (
    <div>
      <div>
        <h2>{currRecipie.title}</h2>
        <span>Made by: {currRecipie.email}</span>
      </div>
      <ul>
        {recipieSteps.map((step) => (
          <li key={step}>
            <strong>{capitalizeFirstLetter(step)}</strong>
            <p>{currRecipie?.recipie[step]}</p>
          </li>
        ))}
      </ul>
      <Link to="/">Back</Link>
    </div>
  );
};
