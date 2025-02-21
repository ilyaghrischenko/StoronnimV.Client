import React, { useContext } from "react";
import { GlobalContext } from "../contexts/shared/GlobalContext";
import { Button } from "react-bootstrap";
import { MusicPlatformModal } from "../elements/button/MusicPlatformModal";

interface AddMusicPlatformButtonProps {
    apiUrl: string;
    modalTitle: string;
    buttonLabel: string;
}

const AddMusicPlatformButton: React.FC<AddMusicPlatformButtonProps> = ({ apiUrl, modalTitle, buttonLabel }) => {
    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    const { OnShowModal } = context;

    if (!sessionStorage.getItem("token")) {
        return null;
    }

    const handleClick = () => {
        OnShowModal(<MusicPlatformModal apiUrl={apiUrl} modalTitle={modalTitle} />);
    };

    return (
        <Button onClick={handleClick} variant="primary">
            {buttonLabel}
        </Button>
    );
};

export { AddMusicPlatformButton };
