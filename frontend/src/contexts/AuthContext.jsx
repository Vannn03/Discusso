import instance from "@utils/axiosConfig";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const response = await instance.get("/auth/verify");
                response.data.authorized
                    ? setIsAuthorized(true)
                    : setIsAuthorized(false);
            } catch (error) {
                console.log(
                    "Error verifying auth: ",
                    error.response?.data?.authorized
                );
            }
        };

        verifyAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
            {children}
        </AuthContext.Provider>
    );
};
