import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import App from "./App";
import Appbar from "./components/AppBar";
import { DarkModeProvider } from "./context/DarkModeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <Appbar>
          <App />
        </Appbar>
      </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>
);
