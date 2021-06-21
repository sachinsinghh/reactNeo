import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

const LoginModal = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Please sign in to continue</Modal.Title>
            </Modal.Header>
        </Modal>
    )
}

export default LoginModal