import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { AuthUser, UserRole } from "@/services/authService";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginUser: (user: AuthUser) => void;
  logoutUser: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loginUser: () => {},
  logoutUser: () => {},
  hasRole: () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const loginUser = useCallback((u: AuthUser) => setUser(u), []);
  const logoutUser = useCallback(() => setUser(null), []);
  const hasRole = useCallback(
    (roles: UserRole[]) => !!user && roles.includes(user.role),
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loginUser, logoutUser, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
