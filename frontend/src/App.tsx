import { Home } from "./components/Home";
import { AuthForm } from "./components/AuthForm";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DataProvider } from "./components/DataProvider";
import "./styles/main.scss";
const App = () => {
  return (
    <DataProvider>
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoute redirectTo="/auth" />}>
            <Route path="*" element={<Home />} />
          </Route>
          <Route path="/auth" element={<AuthForm />} />
        </Routes>
      </div>
    </DataProvider>
  );
};

export default App;
