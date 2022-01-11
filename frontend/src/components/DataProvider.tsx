import { createContext, FC, useState } from "react";
import { Data, Recipies } from "../utils/types";
export const DataContext = createContext<Data | any>(null);
export const DataProvider: FC = ({ children }) => {
  const [data, setData] = useState<Recipies[] | null>(null);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
