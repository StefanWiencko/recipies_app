import axios from "axios";
import { createContext, FC, useEffect, useState } from "react";
import constants from "../constants";

export const DataContext = createContext<any>(null);
export const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    const jwt = localStorage.getItem("recipies_app_jwt");
    axios
      .get(constants.baseUrl + "/api", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        setData(false);
        console.log(err);
      });
  }, []);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {data !== null && children}
    </DataContext.Provider>
  );
};
