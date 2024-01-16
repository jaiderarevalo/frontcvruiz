import React, { createContext, useContext, useState, ReactNode } from "react";
import { formClientInterface } from "../interfaces/interfac";
import {  postClient } from "../api/client";

interface ClientContextProps {
  clients: formClientInterface[];
  postClient: (user: formClientInterface) => void;
}
interface ClientProviderProps {
  children: ReactNode;
}

const clientContext = createContext<ClientContextProps | undefined>(undefined);

export const useClientContext = () => {
  const context = useContext(clientContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};

export const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
  const [clients, setClients] = useState<formClientInterface[]>([]);

  const handlePostClient = async (user: formClientInterface) => {
    const res = await postClient(user);
    setClients(res.data);
  };
  const contextValue: ClientContextProps = {
    clients,
    postClient: handlePostClient,
  };

  return (
    <clientContext.Provider value={contextValue}>
      {children}
    </clientContext.Provider>
  );
};
