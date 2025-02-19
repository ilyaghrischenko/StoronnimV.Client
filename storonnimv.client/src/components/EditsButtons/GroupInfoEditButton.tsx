import { FC, useContext, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { IGroupInfo } from "../../models/group/IGroupInfo";
import { GlobalContext } from "../contexts/shared/GlobalContext";

interface GroupInfoEditButtonProps {
    groupInfo: IGroupInfo;
}

const GroupInfoEditButton: FC<GroupInfoEditButtonProps> = ({ groupInfo }) => {
    const [newDescription, setNewDescription] = useState(groupInfo.description);
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        return null;
    }

    const { OnShowModal, OnHideModal } = globalContext;

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewDescription(event.target.value);
    };

    const handleSave = () => {
        console.log("Updated group description:", newDescription);
        OnHideModal();
    };

    const openEditModal = () => {
        OnShowModal(
            <div>
                <h3>Редагування інформації про групу</h3>
                <Form>
                    <Form.Group controlId="groupDescription">
                        <Form.Label>Опис групи</Form.Label>
                        <Form.Control
                            type="text"
                            value={newDescription}
                            onChange={handleDescriptionChange}
                            placeholder="Введіть новий опис групи"
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={handleSave}>Зберегти</Button>
            </div>,
            "Редагування інформації про групу"
        );
    };

    return (
        <Button variant="primary" onClick={openEditModal}>
            Редагувати інформацію про групу
        </Button>
    );
};

export { GroupInfoEditButton };

// TODO : решить проблему с вводом данных в поля ввода кнопок изминения(не работает)