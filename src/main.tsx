import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.tsx";
import Appbar from "./components/AppBar.tsx";
import { DarkModeProvider } from "./components/DarkModeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <Appbar>
        <App />
      </Appbar>
    </DarkModeProvider>
  </StrictMode>
);
