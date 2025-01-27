import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import instance from "@utils/axiosConfig";
import ModalTemplate from "@components/templates/ModalTemplate";

const LogoutButton = ({ setIsLoggedOut }) => {
    const nav = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setIsAuthorized } = useOutletContext();

    const logoutUser = async () => {
        try {
            setLoading(true);
            await instance.post(
                "/logout",
                {} // Pass an empty object as the data payload
            );
            setIsAuthorized(false);
            nav("/"); // Refresh the page
            setIsLoggedOut(true);
        } catch (error) {
            console.error(error.response?.data?.error || "An error occurred");
            setIsLoggedOut(false);
        }
        setLoading(false);
    };

    return (
        <>
            <ListGroup.Item
                action
                className="text-danger"
                onClick={() => setModalShow(true)}
            >
                Logout
            </ListGroup.Item>
            <ModalTemplate
                show={modalShow} // Ensure show is linked to modalShow state
                onHide={() => setModalShow(false)} // Correctly close the modal
                do={logoutUser}
                heading={"Logout"}
                description={"Are you sure you want to logout?"}
                variant={"danger"}
                buttonName={"Logout"}
                loading={loading}
            />
        </>
    );
};

export default LogoutButton;
