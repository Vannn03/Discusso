import ToastTemplate from "@components/templates/ToastTemplate";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastStack = ({
    isLoggedOut,
    setIsLoggedOut,
    isUserUpdated,
    setIsUserUpdated,
    isAccountDeleted,
    setIsAccountDeleted,
}) => {
    return (
        <ToastContainer
            position="bottom-end"
            className="p-3"
            style={{ zIndex: 1 }}
        >
            {isLoggedOut === true && (
                <ToastTemplate
                    color="success"
                    title="Logout Successful"
                    description="You have successfully logged out from your account!"
                    show={isLoggedOut}
                    close={() => setIsLoggedOut(false)}
                />
            )}
            {isLoggedOut === false && (
                <ToastTemplate
                    color="danger"
                    title="Logout Failed"
                    description="Your logout attempt has failed!"
                    show={isLoggedOut}
                    close={() => setIsLoggedOut(false)}
                />
            )}
            {isAccountDeleted === true && (
                <ToastTemplate
                    color="success"
                    title="Delete Account Successful"
                    description="You have successfully deleted your account!"
                    show={isAccountDeleted}
                    close={() => setIsAccountDeleted(false)}
                />
            )}
            {isAccountDeleted === false && (
                <ToastTemplate
                    color="danger"
                    title="Delete Account Failed"
                    description="Your account deletion attempt has failed!"
                    show={isAccountDeleted}
                    close={() => setIsAccountDeleted(false)}
                />
            )}
            {isUserUpdated === true && (
                <ToastTemplate
                    color="success"
                    title="Update profile Successful"
                    description="You have successfully updated your profile!"
                    show={isUserUpdated}
                    close={() => setIsUserUpdated(false)}
                />
            )}
            {isUserUpdated === false && (
                <ToastTemplate
                    color="danger"
                    title="Logout Failed"
                    description="Your profile update attempt has failed!"
                    show={isUserUpdated}
                    close={() => setIsUserUpdated(false)}
                />
            )}
        </ToastContainer>
    );
};

export default ToastStack;
