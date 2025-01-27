import { useNavigate } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import instance from "@utils/axiosConfig";
import ModalTemplate from "@components/templates/ModalTemplate";

const DeleteAccountButton = ({ setIsAccountDeleted }) => {
    const nav = useNavigate();
    const [modalShow, setModalShow] = useState(false);

    const deleteAccount = async () => {
        try {
            const response = await instance.delete("/delete-account");
            console.log(response.data.message);
            nav("/");
            setIsAccountDeleted(true);
        } catch (error) {
            console.error(error.response?.data?.error || "An error occurred");
            setIsAccountDeleted(false);
        }
    };

    return (
        <>
            <ListGroup.Item
                action
                className="text-danger"
                onClick={() => setModalShow(true)}
            >
                Delete Account
            </ListGroup.Item>
            <ModalTemplate
                show={modalShow} // Ensure show is linked to modalShow state
                onHide={() => setModalShow(false)} // Correctly close the modal
                do={deleteAccount}
                heading={"Delete Account"}
                description={
                    "Are you sure you want to permanently delete your account? This action cannot be undone."
                }
                variant={"danger"}
                buttonName={"Delete Account"}
            />
        </>
    );
};

export default DeleteAccountButton;
