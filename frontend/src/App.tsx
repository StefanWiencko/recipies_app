import { createContext, useState, useEffect } from "react";
import { Home } from "./components/Home";
import { Auth } from "./components/Auth";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DataContext } from "./components/FetchDataProvider";
import axios from "axios";
import constants from "./constants";
export const LoginContext = createContext<null | boolean>(null);
const App = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    axios
      .get(constants.baseUrl + "/api", {
        headers: {
          Authorization: `Bearer ${constants.jwt}`,
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
    <DataContext.Provider value={data}>
      {data !== null && (
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute redirectTo="/login">
                  <Home />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/login" element={<Auth />} />
          </Routes>
        </div>
      )}
    </DataContext.Provider>
  );
};

export default App;
