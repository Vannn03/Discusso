import NavBar from "@components/NavBar";
import ToastStack from "@components/ToastStack";
import { useContext } from "react";
import { Outlet, useLocation } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "@contexts/AuthContext";

const App = () => {
    const loc = useLocation();
    const { isAuthorized } = useContext(AuthContext);

    if (isAuthorized === null) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <span className="d-flex align-items-center gap-2">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading..</p>
                </span>
            </div>
        );
    }

    return (
        <>
            {loc.pathname != "/register" && loc.pathname != "/login" && (
                <NavBar isAuthorized={isAuthorized} />
            )}
            <div className="container">
                <Outlet />
                <ToastStack />
            </div>
        </>
    );
};

export default App;
