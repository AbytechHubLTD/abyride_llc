import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { ClientAuthContextProvider } from "./context/ClientAuthContext.jsx";
import { DriverAuthContextProvider } from "./context/DriverAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DriverAuthContextProvider>
      <ClientAuthContextProvider>
        <App />
      </ClientAuthContextProvider>
    </DriverAuthContextProvider>
  </StrictMode>,
);
