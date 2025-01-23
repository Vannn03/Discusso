import ListGroup from "react-bootstrap/ListGroup";
import { Outlet, useLocation } from "react-router";
import DeleteAccountButton from "@components/buttons/DeleteAccountButton";
import LogoutButton from "@components/buttons/LogoutButton";

const Settings = () => {
    const loc = useLocation();
    return (
        <div className="d-flex gap-4">
            <ListGroup defaultActiveKey={loc.pathname} className="w-25">
                <ListGroup.Item action href="/settings/profile">
                    Profile
                </ListGroup.Item>
                <LogoutButton />
                <DeleteAccountButton />
            </ListGroup>
            <div className="border-start ps-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Settings;
