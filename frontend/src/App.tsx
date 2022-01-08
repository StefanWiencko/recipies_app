import { Home } from "./components/Home";
import { Auth } from "./components/AuthForm";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DataProvider } from "./components/DataProvider";
const App = () => {
  return (
    <DataProvider>
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </DataProvider>
  );
};

export default App;
