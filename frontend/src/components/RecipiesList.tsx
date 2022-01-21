import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Recipies } from "../utils/types";
import { DataContext } from "./DataProvider";

export const RecipiesList: FC = () => {
  const data: Recipies[] = useContext(DataContext)?.data;
  const sortedData = data?.sort((a, b) => b.id - a.id);
  return (
    <div>
      <ul className="recipiesList">
        {sortedData?.map((element) => (
          <li className="listElement" key={element.id}>
            <Link className="link" to={`/recipie?id=${element.id}`}>
              <div>
                <strong>{element.title}</strong>
                <span>Created by: {element.email} </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
