import instance from "@utils/axiosConfig";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { ToastContext } from "@contexts/ToastContext";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [buttonToggle, setButtonToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setIsUserUpdated } = useContext(ToastContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue, // Allows setting default values programmatically
        reset, // To reset form values
    } = useForm({
        mode: "onTouched", // Validate on blur or touch
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await instance.get("/logged-user");
                setUserData(response.data);

                // Set default values for form fields
                setValue("username", response.data.username);
                setValue("bio", response.data.bio);
            } catch (error) {
                console.error(
                    error.response?.data?.error || "An error occurred"
                );
            }
        };

        fetchUserData();
    }, [setValue]);

    const handleEdit = () => {
        setButtonToggle(true); // Enable editing
    };

    const handleCancel = () => {
        reset({
            username: userData?.username,
            bio: userData?.bio,
            profilePicture: null,
        }); // Reset the form to original values
        setButtonToggle(false); // Disable editing
    };

    const editUser = async (data) => {
        const formData = new FormData();

        // Append text fields
        formData.append("username", data.username);
        formData.append("bio", data.bio);

        // Append profile picture if it exists
        if (data.profilePicture?.[0]) {
            formData.append("profile_picture", data.profilePicture[0]); // File input
        }
        try {
            setLoading(true);
            const response = await instance.put("/edit-user", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // Update user data in state after a successful response
            setUserData(response.data.user);
            setButtonToggle(false); // Disable editing
            setIsUserUpdated(true);
        } catch (error) {
            console.error("Error: ", error);
            setIsUserUpdated(false);
        }
        setLoading(false);
    };

    return (
        <div className="p-4">
            <h3 className="mb-4">Edit Profile</h3>
            <Form noValidate onSubmit={handleSubmit(editUser)}>
                <Form.Group className="mb-4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        disabled={!buttonToggle}
                        required
                        type="text"
                        placeholder="Enter your username"
                        {...register("username", {
                            required: "Username is required",
                        })}
                        isInvalid={errors.username ? true : false}
                    />
                    {errors.username && (
                        <Form.Control.Feedback type="invalid">
                            {errors.username.message}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        disabled={!buttonToggle}
                        placeholder="Write something about yourself"
                        {...register("bio")}
                    />
                    <Form.Text className="text-muted">Optional</Form.Text>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-4">
                    <Form.Label>Profile Picture</Form.Label>
                    <div className="d-flex align-items-center gap-4">
                        <Image
                            src={
                                !userData?.profile_picture
                                    ? "/no-profile-picture.webp"
                                    : `${import.meta.env.VITE_API_URL}/${
                                          userData.profile_picture
                                      }`
                            }
                            width={175}
                            thumbnail
                        />
                        <Form.Control
                            type="file"
                            disabled={!buttonToggle}
                            {...register("profilePicture")}
                        />
                    </div>
                    <Form.Text className="text-muted">Optional</Form.Text>
                </Form.Group>

                <div className="d-flex justify-content-end gap-3">
                    {buttonToggle ? (
                        <>
                            <Button
                                variant="outline-secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </>
                    ) : (
                        <Button variant="warning" onClick={handleEdit}>
                            Edit Profile
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default Profile;
