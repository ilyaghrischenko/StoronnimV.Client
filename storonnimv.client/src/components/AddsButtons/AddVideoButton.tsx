import React, { useContext } from "react";
import { GlobalContext } from "../contexts/shared/GlobalContext.tsx";
import { Button } from "react-bootstrap";
import { VideoContentModal } from "../elements/button/VideoContentModal.tsx";

interface AddVideoButtonProps {
    apiUrl: string;
    modalTitle: string;
    buttonLabel: string;
}

const AddVideoButton: React.FC<AddVideoButtonProps> = ({ apiUrl, modalTitle, buttonLabel }) => {
    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    const { OnShowModal } = context;

    if (!sessionStorage.getItem("token")) {
        return null;
    }

    const handleClick = () => {
        OnShowModal(
            <VideoContentModal 
                apiUrl={apiUrl} 
                modalTitle={modalTitle} 
                buttonLabel={buttonLabel} 
                section="video"
            />
        );
    };

    return (
        <Button onClick={handleClick} variant="primary">
            {buttonLabel}
        </Button>
    );
};

export { AddVideoButton };
