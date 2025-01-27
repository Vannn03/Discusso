import { useNavigate } from "react-router";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import instance from "@utils/axiosConfig";
import ModalTemplate from "@components/templates/ModalTemplate";
import { useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteAccountButton = ({ setIsAccountDeleted }) => {
    const nav = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched", // Validate on blur or touch
    });

    const deleteAccount = async (data) => {
        if (data.confirmation !== "DELETE ACCOUNT") {
            return; // Validation safeguard
        }

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
                className="text-danger py-3 d-flex align-items-center gap-2"
                onClick={() => setModalShow(true)}
            >
                <RiDeleteBin6Line size={20} /> Delete Account
            </ListGroup.Item>
            <ModalTemplate
                show={modalShow} // Ensure show is linked to modalShow state
                onHide={() => setModalShow(false)} // Correctly close the modal
                do={handleSubmit(deleteAccount)}
                heading={"Delete Account"}
                description={
                    <>
                        <p>
                            Are you sure you want to permanently delete your
                            account? This action cannot be undone.
                        </p>
                        <Form.Label>
                            Type &quot;<strong>DELETE ACCOUNT</strong>&quot; to
                            confirm you action
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter confirmation"
                            {...register("confirmation", {
                                required: "Confirmation is required",
                                validate: (value) =>
                                    value === "DELETE ACCOUNT" ||
                                    "You must type DELETE ACCOUNT exactly",
                            })}
                            isInvalid={errors.confirmation ? true : false}
                            autoFocus
                        />
                        {errors.confirmation && (
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmation.message}
                            </Form.Control.Feedback>
                        )}
                    </>
                }
                variant={"danger"}
                buttonName={"Delete Account"}
            />
        </>
    );
};

export default DeleteAccountButton;
