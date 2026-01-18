import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FoodProvider } from "./context/FoodContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FoodProvider>
      <App />
    </FoodProvider>
  </AuthProvider>
);
