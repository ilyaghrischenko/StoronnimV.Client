import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../contexts/shared/GlobalContext";
import { AddMemberModal } from "../elements/button/AddMemberModal ";

interface AddGroupButtonProps {
    buttonLabel: string;
}

const AddGroupButton: React.FC<AddGroupButtonProps> = ({ buttonLabel }) => {
    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    const { sendRequest } = context;
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleHideModal = () => setShowModal(false);

    return (
        <>
            <Button onClick={handleShowModal} variant="primary">
                {buttonLabel}
            </Button>

            <AddMemberModal show={showModal} onHide={handleHideModal} sendRequest={sendRequest} />
        </>
    );
};

export { AddGroupButton };
