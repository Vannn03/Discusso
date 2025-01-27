import NavBar from "@components/NavBar";
import ToastStack from "@components/ToastStack";
import instance from "@utils/axiosConfig";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";

const App = () => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [isLoggedOut, setIsLoggedOut] = useState(null);
    const [isAccountDeleted, setIsAccountDeleted] = useState(null);
    const [isUserUpdated, setIsUserUpdated] = useState(null);
    const loc = useLocation();

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

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {loc.pathname != "/register" && loc.pathname != "/login" && (
                <NavBar isAuthorized={isAuthorized} />
            )}
            <div className="container">
                <Outlet
                    context={{
                        isAuthorized,
                        setIsAuthorized,
                        setIsLoggedOut,
                        setIsUserUpdated,
                        setIsAccountDeleted,
                    }}
                />

                <ToastStack
                    isLoggedOut={isLoggedOut}
                    setIsLoggedOut={setIsLoggedOut}
                    isUserUpdated={isUserUpdated}
                    setIsUserUpdated={setIsUserUpdated}
                    isAccountDeleted={isAccountDeleted}
                    setIsAccountDeleted={setIsAccountDeleted}
                />
            </div>
        </>
    );
};

export default App;
