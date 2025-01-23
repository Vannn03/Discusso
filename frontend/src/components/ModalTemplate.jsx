import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalTemplate = ({
    show,
    onHide,
    heading,
    description,
    do: action,
    variant,
    buttonName,
}) => {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop="static"
            show={show} // Correctly link the show prop
            onHide={onHide} // Close the modal when this is triggered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {heading}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide} variant="secondary">
                    Cancel
                </Button>
                <Button onClick={action} variant={variant}>
                    {buttonName}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalTemplate;
