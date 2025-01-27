import Toast from "react-bootstrap/Toast";

const ToastTemplate = ({ color, title, time, description, show, close }) => {
    return (
        <Toast bg={color} delay={5000} autohide show={show} onClose={close}>
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
                <small>{time}</small>
            </Toast.Header>
            <Toast.Body>{description}</Toast.Body>
        </Toast>
    );
};

export default ToastTemplate;
