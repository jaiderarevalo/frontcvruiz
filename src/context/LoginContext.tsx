import { ReactNode, createContext, useContext,useState } from "react";
import { login } from "../interfaces/interfac";
import { logins } from "../api/login";

interface loginContextProps {
  users: login[];
  userLogin: (user: login) => void;
}
interface loginProviderProps {
  children: ReactNode;
}
const loginContext = createContext<loginContextProps | undefined>(undefined);

export const usePostLoginContext = () => {
  const context = useContext(loginContext);
  if (!context) {
    throw new Error("useLoginContext must be used within a LoginProvider");
  }
    return context;
};

export const LoginProviders: React.FC<loginProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<login[]>([]);
  const userLogin = async (user: login) => {
    try {
      const res = await logins(user);
      console.log(res.data);
      window.localStorage.setItem("token", res.data.access_token);
      setUsers(res.data);
      console.log(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const contextValue: loginContextProps = {
    userLogin,
    users,
  };
  return (
    <loginContext.Provider value={contextValue}>
      {children}
    </loginContext.Provider>
  );
};
