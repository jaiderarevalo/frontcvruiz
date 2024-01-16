import React, { createContext, useContext, useState, ReactNode } from "react";
import { typeProject } from "../interfaces/interfac";
import { postProject } from "../api/project";

interface projectContextProps {
  newProject: typeProject[];
  postProject: (user: typeProject,image:File) => void;
}
interface projectProviderProps {
  children: ReactNode;
}

const FormProyectContext = createContext<projectContextProps | undefined>(
  undefined
);

export const useFormProjectContext = () => {
  const context = useContext(FormProyectContext);
  if (!context) {
    throw new Error("formProjectContext must be used within a ClientProvider");
  }
  return context;
};

export const FormProjectProvider: React.FC<projectProviderProps> = ({
  children,
}) => {
  const [newProject, setNewProject] = useState<typeProject[]>([]);

  const handlePostProject = async (user: typeProject,image:File) => {
    const res = await postProject(user,image);
    setNewProject(res.data);
  };
  const contextValue: projectContextProps = {
    newProject,
    postProject: handlePostProject,
  };

  return (
    <FormProyectContext.Provider value={contextValue}>
      {children}
    </FormProyectContext.Provider>
  );
};
