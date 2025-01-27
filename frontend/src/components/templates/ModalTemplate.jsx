import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

const ModalTemplate = ({
    show,
    onHide,
    heading,
    description,
    do: action,
    variant,
    buttonName,
    loading,
}) => {
    return (
        <Modal
            backdrop="static"
            show={show} // Correctly link the show prop
            onHide={onHide} // Close the modal when this is triggered
        >
            <Modal.Header closeButton>
                <Modal.Title>{heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{description}</Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant="outline-secondary">
                    Cancel
                </Button>
                <Button onClick={action} variant={variant} disabled={loading}>
                    {loading ? (
                        <Spinner animation="border" size="sm" />
                    ) : (
                        buttonName
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalTemplate;
