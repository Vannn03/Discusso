import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { Link } from "react-router";
import { IoSettingsOutline } from "react-icons/io5";
import instance from "@utils/axiosConfig";

const NavBar = ({ isAuthorized }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await instance.get("/logged-user");
                setUserData(response.data);
            } catch (error) {
                console.error(
                    error.response?.data?.error || "An error occurred"
                );
            }
        };

        fetchUserData();
    }, []);
    return (
        <Navbar className="bg-body-tertiary mb-4">
            <Container>
                <Navbar.Brand href="/">
                    <Image
                        src="/logo.webp"
                        width="60"
                        height="60"
                        className="d-inline-block align-top"
                        alt="discusso-logo"
                    />
                </Navbar.Brand>
                {/* <Nav className="me-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                </Nav> */}
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {isAuthorized ? (
                            <div className="d-flex align-items-center gap-3">
                                <Link to={"/settings/profile"}>
                                    <Button
                                        variant="light"
                                        className="d-flex align-items-center"
                                    >
                                        <IoSettingsOutline size={20} />
                                    </Button>
                                </Link>
                                <Image
                                    src={
                                        !userData?.profile_picture
                                            ? "/no-profile-picture.webp"
                                            : `${
                                                  import.meta.env.VITE_API_URL
                                              }/${userData.profile_picture}`
                                    }
                                    roundedCircle
                                    width="50"
                                    height="50"
                                    alt="profile-picture"
                                />
                            </div>
                        ) : (
                            <Link to={"/register"}>
                                <Button variant="primary">Register</Button>
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
