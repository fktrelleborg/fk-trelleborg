import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LogOutPage from "./pages/LogOutPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import useAuth from "./hooks/useAuth";
import ProtectedRoutes from "./Components/ProtectedRoutes";

import "./css/App.css";

function App() {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser && <Header />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/logout" element={<LogOutPage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
