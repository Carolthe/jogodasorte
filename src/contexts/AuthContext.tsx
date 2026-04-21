import { createContext, useContext, useState, useRef, ReactNode } from "react";
import api from "@/src/services/api";

type User = any;

type AuthContextType = {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const tokenRef = useRef<string | null>(null);

  const login = (usuario: User, token: string) => {
    tokenRef.current = token;
    // Injeta o token em todas as requisições futuras
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(usuario);
  };

  const logout = () => {
    tokenRef.current = null;
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);