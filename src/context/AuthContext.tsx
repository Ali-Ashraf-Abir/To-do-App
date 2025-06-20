'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    user: any;
    setUser: (user: any) => void;
    loggedIn: boolean | null;
    setLoggedIn: (loggedIn: boolean | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [loggedIn,setLoggedIn] = useState<boolean | null>(null);
    
    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
