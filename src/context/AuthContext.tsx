import jwtDecode from "jwt-decode";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AuthContextProps {
  token: string | null;
  userRoles: string[];
  handleLogin: (tokenFromBackend: string) => void;
  handleLogout: () => void;
}
interface AuthProviderProps {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    const cookies = document.cookie.split(";");
    const authTokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("co_token=")
    );
    if (authTokenCookie) {
        const [tokenFromCookie] = authTokenCookie.split("=")
        setToken(tokenFromCookie)
      }
  }, []);
  const handleLogin = (tokenFromBackend: string) => {
    document.cookie = `co_token=${tokenFromBackend}; path=/`;
    setToken(tokenFromBackend);
  }
    const handleLogout = () => {
    document.cookie = `co_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    setToken('');
    }
    const decodedToken = jwtDecode(token || '') as { [key: string]: string };
    const userRoles:string[] = Array.isArray(decodedToken.roles)? decodedToken.roles : [];
    const contextValue: AuthContextProps = {
        token,
        userRoles,
        handleLogin,
        handleLogout,
    }
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
