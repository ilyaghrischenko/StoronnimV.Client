import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { Button } from "react-bootstrap";
import { MusicPlatformModal } from "../../music/forms/MusicPlatformModal.tsx";
import { IoAddCircleSharp } from "react-icons/io5";

interface AddMusicPlatformButtonProps {
    apiUrl: string;
    modalTitle: string;
    buttonLabel: string;
}

const AddMusicPlatformButton: React.FC<AddMusicPlatformButtonProps> = ({ apiUrl, modalTitle }) => {
    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    const { OnShowModal } = context;

    const handleClick = () => {
        OnShowModal(<MusicPlatformModal apiUrl={apiUrl} modalTitle={modalTitle} />);
    };

    return (
        <Button onClick={handleClick} variant="primary">
            <IoAddCircleSharp />
        </Button>
    );
};

export { AddMusicPlatformButton };
