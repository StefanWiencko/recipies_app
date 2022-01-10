import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { RecipiesInterface } from "../utils/types";
import { DataContext } from "./DataProvider";

export const RecipiesList: FC = () => {
  const data = useContext(DataContext)?.data;
  return (
    <div>
      <ul>
        {data &&
          data.map((element: RecipiesInterface) => (
            <li key={element.id}>
              <Link to={`/recipie?id=${element.id}`}>
                <strong>{element.title}</strong>
                <span>Created by: {element.email} </span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};
