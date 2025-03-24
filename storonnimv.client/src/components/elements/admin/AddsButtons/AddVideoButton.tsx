import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { Button } from "react-bootstrap";
import { VideoContentModal } from "../../button/VideoContentModal.tsx";
import { IoAddCircleSharp } from "react-icons/io5";

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
            <IoAddCircleSharp />
        </Button>
    );
};

export { AddVideoButton };
