import axios from "axios";
import { createContext, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../constants";
import { DataInterface, RecipiesInterface } from "../utils/types";

const jwt = localStorage.getItem("recipies_app_jwt");
export const DataContext = createContext<DataInterface | any>(null);
export const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<RecipiesInterface[] | any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("start");
    axios
      .get(constants.baseUrl + "/api", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log("end", res.data);
      })
      .then(() => navigate("/"))
      .catch((err) => {
        setData(false);
        navigate("/auth");
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {data !== null && children}
    </DataContext.Provider>
  );
};
