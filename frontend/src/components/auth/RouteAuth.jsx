import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router";

// ProtectedRoute for authorized-only pages
const ProtectedRoute = ({ isAuthorized, children }) => {
    if (isAuthorized === false) {
        // Redirect unauthorized users to the login page
        return <Navigate to="/" replace />;
    }

    // Render the page if authorized
    return children;
};

// UnauthorizedRoute for unauthorized-only pages (like login/register)
const UnauthorizedRoute = ({ isAuthorized, children }) => {
    if (isAuthorized === true) {
        // Redirect authorized users to the home page
        return <Navigate to="/" replace />;
    }

    // Render the page if unauthorized
    return children;
};

export const ProtectedWrapper = ({ children }) => {
    // Hooks must be inside the function body of React components
    const { isAuthorized } = useContext(AuthContext);

    // Pass the children to the ProtectedRoute
    return (
        <ProtectedRoute isAuthorized={isAuthorized}>{children}</ProtectedRoute>
    );
};

export const UnauthorizedWrapper = ({ children }) => {
    const { isAuthorized } = useContext(AuthContext);

    // Pass the children to the UnauthorizedRoute
    return (
        <UnauthorizedRoute isAuthorized={isAuthorized}>
            {children}
        </UnauthorizedRoute>
    );
};
