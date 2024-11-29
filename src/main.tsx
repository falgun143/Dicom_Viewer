import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import Appbar from "./components/AppBar.tsx";
import { DarkModeProvider } from "./context/DarkModeContext.tsx";

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
