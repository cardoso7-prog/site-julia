import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

import Index from "./routes/index";
import Carta from "./routes/carta";
import Julia from "./routes/julia";
import Lembrancas from "./routes/lembrancas";

const pathname = window.location.pathname.replace(/\/$/, "");

const Page =
  pathname === "/carta"
    ? Carta
    : pathname === "/julia"
    ? Julia
    : pathname === "/lembrancas"
    ? Lembrancas
    : Index;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>
);