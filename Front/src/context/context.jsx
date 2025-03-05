import { createContext, useEffect, useMemo, useState } from "react";
import AuthService from "../services/AuthService";
import AdminService from "../services/AdminService";
import SalesService from "../services/SalesService";

const MyContext = createContext();

function ContextProvider({ children }) {
    const $Auth = useMemo(() => new AuthService(), []);
    const $Sales = useMemo(() => new SalesService(), []);

    // Carga inicial del usuario
    const [actualUser, setActualUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error parsing user from localStorage:", error);
            return null;
        }
    });

    // Carga inicial del token
    const [accessToken, setAccessToken] = useState(() => {
        try {
            const storedToken = localStorage.getItem("accessToken");
            if (storedToken) {
                const { token, expiresAt } = JSON.parse(storedToken);
                if (Date.now() < expiresAt) {
                    return token;
                }
                localStorage.removeItem("accessToken"); // Limpia el token expirado
            }
            return null;
        } catch (error) {
            console.error("Error parsing token from localStorage:", error);
            return null;
        }
    });

    // AdminService que depende del token
    const $Admin = useMemo(() => {
        return new AdminService(accessToken);
    }, [accessToken]);
    

    // Maneja la actualización del token en localStorage y la limpieza al cerrar sesión
    useEffect(() => {
        if (accessToken) {
            // const expirationTime = Date.now() + 1 * 60 * 1000; // 1 minuto  
            const expirationTime = Date.now() + 12 * 60 * 60 * 1000; // 12 horas
            $Auth.setToken(accessToken);
            localStorage.setItem("accessToken", JSON.stringify({ token: accessToken, expiresAt: expirationTime }));
        } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        }
    }, [accessToken, $Auth]);

    // Actualiza el usuario en localStorage
    useEffect(() => {
        if (actualUser) {
            localStorage.setItem("user", JSON.stringify(actualUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [actualUser]);

    // Auto-logout al expirar el token
    useEffect(() => {
        if (accessToken) {
            const storedToken = JSON.parse(localStorage.getItem("accessToken"));
            const timeLeft = storedToken?.expiresAt - Date.now();

            if (timeLeft > 0) {
                const timeout = setTimeout(() => {
                    logout();
                }, timeLeft);
                return () => clearTimeout(timeout); // Limpia el temporizador al desmontar
            } else {
                logout();
            }
        }
    }, [accessToken]);

    // Cerrar sesión
    const logout = () => {
        setAccessToken(null);
        setActualUser(null);
        localStorage.clear();
    };

    return (
        <MyContext.Provider
            value={{
                $Auth,
                $Admin,
                $Sales,
                actualUser,
                setActualUser,
                accessToken,
                setAccessToken,
                logout,
            }}
        >
            {children}
        </MyContext.Provider>
    );
}

export { ContextProvider, MyContext };
