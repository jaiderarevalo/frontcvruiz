import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClientProvider } from "./context/clientContext.tsx";
import { ProjectProviders } from "./context/ProjectContext.tsx";
import { FormProjectProvider } from "./context/FormProjectContext.tsx";
//import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { LoginProviders } from "./context/LoginContext.tsx";
//import { AuthProvider } from "./context/AuthContext.tsx";

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },{
//     element:
//   }
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClientProvider>
      <ProjectProviders>
        <FormProjectProvider>
          <LoginProviders>
            <App />
          </LoginProviders>
        </FormProjectProvider>
      </ProjectProviders>
    </ClientProvider>
  </React.StrictMode>
);
