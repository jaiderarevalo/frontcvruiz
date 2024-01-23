import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
//import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./Store/Slices/index.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
