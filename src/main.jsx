import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider.jsx";
import App from "./App.jsx";

import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter basename={"/fk-trelleborg/"}>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
