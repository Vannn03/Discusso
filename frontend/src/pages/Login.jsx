import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import instance from "@utils/axiosConfig";
import { AuthContext } from "@contexts/AuthContext";

const Login = () => {
    const nav = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onTouched", // Validate on blur or touch
    });
    const { setIsAuthorized } = useContext(AuthContext);

    const loginUser = async (data) => {
        try {
            setLoading(true);
            const response = await instance.post("/login", {
                email: data.email,
                password: data.password,
            });
            setSuccessMessage(response.data.message);
            setTimeout(() => {
                setIsAuthorized(true);
                nav("/");
            }, 2000);
        } catch (error) {
            setErrorMessage(error.response?.data?.error || "An error occurred");
        }
        setLoading(false);
    };

    return (
        <main className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="p-4 shadow-lg rounded bg-white w-50">
                <h3 className="text-center mb-4">Welcome Back</h3>
                <Form
                    noValidate
                    onSubmit={handleSubmit(loginUser)}
                    className="d-flex flex-column"
                >
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address",
                                },
                            })}
                            isInvalid={errors.email ? true : false}
                            autoFocus
                        />
                        {errors.email && (
                            <Form.Control.Feedback type="invalid">
                                {errors.email.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters long",
                                },
                            })}
                            isInvalid={errors.password ? true : false}
                        />
                        {errors.password && (
                            <Form.Control.Feedback type="invalid">
                                {errors.password.message}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    {errorMessage && (
                        <Alert key="danger" variant="danger">
                            {errorMessage}
                        </Alert>
                    )}
                    {successMessage && (
                        <Alert key="success" variant="success">
                            {successMessage}
                        </Alert>
                    )}

                    <Button
                        variant="primary"
                        type="submit"
                        className="mb-3"
                        disabled={loading}
                    >
                        {loading ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            "Login"
                        )}
                    </Button>

                    <hr />

                    <div className="text-center">
                        <span>Don&apos;t have an account? </span>
                        <Link to={"/register"}>Register</Link>
                    </div>
                </Form>
            </div>
        </main>
    );
};

export default Login;
