import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const TOKEN_KEY = 'auth-tokens';
const USERNAME_KEY = 'auth-usernames';

interface AuthContextType {
    token: string | null;
    username: string | null;
    isLoading: boolean;
    login: (token: string, username: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const restore = async () => {
            const [t, u] = await Promise.all([
                AsyncStorage.getItem(TOKEN_KEY),
                AsyncStorage.getItem(USERNAME_KEY),
            ]);
            setToken(t);
            setUsername(u);
            setIsLoading(false);
        };
        void restore();
    }, []);

    const login = async (t: string, u: string) => {
        await Promise.all([
            AsyncStorage.setItem(TOKEN_KEY, t),
            AsyncStorage.setItem(USERNAME_KEY, u),
        ]);
        setToken(t);
        setUsername(u);
    };

    const logout = async () => {
        await Promise.all([
            AsyncStorage.removeItem(TOKEN_KEY),
            AsyncStorage.removeItem(USERNAME_KEY),
        ]);
        setToken(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ token, username, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);