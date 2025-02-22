import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../contexts/shared/GlobalContext"; 
import { IMusicPlatformItem } from "../../models/music/IMusicPlatformItem";
import { FaEdit } from "react-icons/fa";

interface MusicEditButtonProps {
    item: IMusicPlatformItem;
}

const MusicEditButton: React.FC<MusicEditButtonProps> = ({ item }) => {
    const { OnShowModal, OnHideModal } = useContext(GlobalContext)!;
    const [editedItem, setEditedItem] = useState<IMusicPlatformItem>(item);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, []);

    const handleSave = async () => {
        try {
            console.log("Сохранено: ", editedItem);
            OnHideModal();
        } catch (error) {
            console.error("Помилка при збереженні платформи:", error);
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div>
                <label>Посилання на платформу:</label>
                <input
                    type="text"
                    name="platformUrl"
                    value={editedItem.platformUrl}
                    onChange={(e) => setEditedItem({ ...editedItem, platformUrl: e.target.value })}
                    className="form-control"
                />
                <label>Зображення фону:</label>
                <input
                    type="text"
                    name="bgImageUrl"
                    value={editedItem.bgImageUrl}
                    onChange={(e) => setEditedItem({ ...editedItem, bgImageUrl: e.target.value })}
                    className="form-control"
                />
                <Button onClick={handleSave} className="mt-2">Зберегти</Button>
            </div>
        );
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <>
            <Button
                className="btn btn-warning position-absolute top-0 end-0 m-2"
                onClick={handleShowModal}
                title="Редагувати"
            >
               <FaEdit />
            </Button>
        </>
    );
};

export { MusicEditButton };
