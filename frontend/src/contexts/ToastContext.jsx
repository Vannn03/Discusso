import { createContext, useState } from "react";

export const ToastContext = createContext();

// Create the AuthProvider component
export const ToastProvider = ({ children }) => {
    const [isLoggedOut, setIsLoggedOut] = useState(null);
    const [isAccountDeleted, setIsAccountDeleted] = useState(null);
    const [isUserUpdated, setIsUserUpdated] = useState(null);

    return (
        <ToastContext.Provider
            value={{
                isLoggedOut,
                setIsLoggedOut,
                isUserUpdated,
                setIsUserUpdated,
                isAccountDeleted,
                setIsAccountDeleted,
            }}
        >
            {children}
        </ToastContext.Provider>
    );
};
