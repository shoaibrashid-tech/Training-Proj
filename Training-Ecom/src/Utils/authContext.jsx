import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = (userData) => {
        setUser(userData);
        setLoading(false);
    };

    const logout = () =>{
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    return(
        <AuthContext.Provider value={{user, login, logout, loading, setLoading}}>
            {children}
        </AuthContext.Provider>
    )

}