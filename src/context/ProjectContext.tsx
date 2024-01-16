import { createContext, useContext, useState, ReactNode } from "react";
import { typeProject } from "../interfaces/interfac";
import { deleteProject, getProject } from "../api/project";

const projectContext = createContext<projectContextProps | null>(null);

interface projectContextProps {
  projects: typeProject[];
  fetchAndSetUsers: () => void;
  deleted: (id: number) => void;
}

interface projectProviderProps {
  children: ReactNode;
}

export const useProjectContext = () => {
  const context = useContext(projectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a projectProvider");
  }
  return context;
};

export const ProjectProviders: React.FC<projectProviderProps> = ({
  children,
}) => {
  const [projects, setProjects] = useState<typeProject[]>([]);

  const fetchAndSetUsers = async () => {
    try {
      const res = await getProject();
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
console.log(projects);

  const deleted = async (id: number) => {
    const res = await deleteProject(id);
    if(res.status === 200){
     setProjects(projects.filter((project) => project.id !== id));
    }
  }

  const contextValue: projectContextProps = {
    deleted,
    projects,
    fetchAndSetUsers,
  };

  return (
    <projectContext.Provider value={contextValue}>
      {children}
    </projectContext.Provider>
  );
};
