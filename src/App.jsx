import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginSignup from "./Components/LoginSignup/LoginSignup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Header from "./Components/Header/Header";

import "./App.css";

function App() {
  return (
    <Router basename={"/fk-trelleborg/"}>
      <Header />
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
