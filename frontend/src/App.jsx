import NavBar from "@components/NavBar";
import instance from "@utils/axiosConfig";
import { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router";

const App = () => {
    const [isAuthorized, setIsAuthorized] = useState(null);
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
                <Outlet context={{ isAuthorized, setIsAuthorized }} />
            </div>
        </>
    );
};

export default App;
