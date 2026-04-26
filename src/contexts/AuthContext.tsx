import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import api from "@/src/services/api";

type User = {
  id_usuario: number;
  nome: string;
  email: string;
  telefone?: string;
  pix_receber?: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  carregando: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const TOKEN_KEY = "sortepremiada_token";
const USER_KEY  = "sortepremiada_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]             = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);
  const tokenRef                    = useRef<string | null>(null);

  // ── Recupera sessão ao iniciar ───────────────────────────────────────────
  useEffect(() => {
    try {
      const tokenSalvo = localStorage.getItem(TOKEN_KEY);
      const userSalvo  = localStorage.getItem(USER_KEY);

      if (tokenSalvo && userSalvo) {
        tokenRef.current = tokenSalvo;
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenSalvo}`;
        setUser(JSON.parse(userSalvo));
      }
    } catch (e) {
      console.warn("Erro ao recuperar sessão:", e);
    } finally {
      setCarregando(false);
    }
  }, []);

  // ── Login ────────────────────────────────────────────────────────────────
  const login = (usuario: User, token: string) => {
    tokenRef.current = token;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(usuario);

    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(usuario));
    } catch (e) {
      console.warn("Erro ao salvar sessão:", e);
    }
  };

  // ── Logout ───────────────────────────────────────────────────────────────
  const logout = () => {
    tokenRef.current = null;
    delete api.defaults.headers.common["Authorization"];
    setUser(null);

    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.warn("Erro ao limpar sessão:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);