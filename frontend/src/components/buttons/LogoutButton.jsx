import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import instance from "@utils/axiosConfig";
import ModalTemplate from "@components/templates/ModalTemplate";
import { AuthContext } from "@contexts/AuthContext";
import { MdOutlineLogout } from "react-icons/md";

const LogoutButton = ({ setIsLoggedOut }) => {
    const nav = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setIsAuthorized } = useContext(AuthContext);

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
                className="text-danger py-3 d-flex align-items-center gap-2"
                onClick={() => setModalShow(true)}
            >
                <MdOutlineLogout size={20} /> Logout
            </ListGroup.Item>
            <ModalTemplate
                show={modalShow} // Ensure show is linked to modalShow state
                onHide={() => setModalShow(false)} // Correctly close the modal
                do={logoutUser}
                heading={"Logout"}
                description={
                    "Are you sure you want to logout from your account?"
                }
                variant={"danger"}
                buttonName={"Logout"}
                loading={loading}
            />
        </>
    );
};

export default LogoutButton;
