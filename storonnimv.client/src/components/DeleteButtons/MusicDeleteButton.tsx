import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../contexts/shared/GlobalContext";
import { IMusicPlatformItem } from "../../models/music/IMusicPlatformItem";
import { MdDeleteForever } from "react-icons/md";

interface MusicDeleteButtonProps {
    item: IMusicPlatformItem;
}

const MusicDeleteButton: React.FC<MusicDeleteButtonProps> = ({ item }) => {
    const { OnShowModal, OnHideModal } = useContext(GlobalContext)!;
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, []);

    const handleDelete = async () => {
        try {
            console.log("Видалено: ", item);
            OnHideModal();
        } catch (error) {
            console.error("Помилка при видаленні музичної платформи:", error);
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div>
                <p style={{ color: "white" }}>Ви впевнені, що хочете видалити цю музичну платформу?</p>
                <Button onClick={handleDelete} className="btn-danger">Видалити</Button>
                <Button onClick={OnHideModal} className="ms-2">Скасувати</Button>
            </div>
        );
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <Button
            className="btn btn-danger position-absolute top-0 end-0 m-2"
            onClick={handleShowModal}
            title="Видалити"
        >
            <MdDeleteForever />
        </Button>
    );
};

export { MusicDeleteButton };
