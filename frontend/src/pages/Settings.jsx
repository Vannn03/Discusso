import ListGroup from "react-bootstrap/ListGroup";
import { Outlet, useLocation } from "react-router";
import DeleteAccountButton from "@components/buttons/DeleteAccountButton";
import LogoutButton from "@components/buttons/LogoutButton";
import { ToastContext } from "@contexts/ToastContext";
import { useContext } from "react";

const Settings = () => {
    const loc = useLocation();
    const { setIsLoggedOut, setIsAccountDeleted } = useContext(ToastContext);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 col-lg-3">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <ListGroup
                                variant="flush"
                                defaultActiveKey={loc.pathname}
                            >
                                <ListGroup.Item
                                    action
                                    href="/settings/profile"
                                    className="py-3"
                                >
                                    Profile
                                </ListGroup.Item>
                                <LogoutButton setIsLoggedOut={setIsLoggedOut} />
                                <DeleteAccountButton
                                    setIsAccountDeleted={setIsAccountDeleted}
                                />
                            </ListGroup>
                        </div>
                    </div>
                </div>

                <div className="col-md-8 col-lg-9">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
