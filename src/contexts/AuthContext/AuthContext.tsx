'use client';
import { SessionProvider } from "next-auth/react";
import React, { createContext, ReactNode } from "react";

interface AuthContextProps {
    isAuthenticated: boolean | null;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    return <SessionProvider>{children}</SessionProvider>
}

export default AuthContext