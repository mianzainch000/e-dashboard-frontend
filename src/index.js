import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { StyledEngineProvider } from "@mui/material";
import { SnackbarProvider } from "./Components/Snackbar";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StyledEngineProvider injectFirst>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </StyledEngineProvider>
);

reportWebVitals();
