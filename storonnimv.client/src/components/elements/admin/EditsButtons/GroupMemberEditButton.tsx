import { FC, useRef, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { IMemberFullInfo } from "../../../../models/group/IMemberInfo.ts";
import { FaEdit } from "react-icons/fa";

interface GroupMemberEditButtonProps {
    item: IMemberFullInfo;
}

const GroupMemberEditButton: FC<GroupMemberEditButtonProps> = ({ item }) => {
    const { OnShowModal, OnHideModal, sendRequest } = useContext(GlobalContext)!;

    // Создаем refs для каждого поля
    const fullNameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const roleRef = useRef<HTMLInputElement>(null);
    const photoRef = useRef<HTMLInputElement>(null);

    const handlePhotoEdit = async () => {
        try {
            const file = photoRef.current?.files ? photoRef.current.files[0] : null;
            if (!file) {
                alert("Спочатку оберіть фото");
                return;
            }

            const formData = new FormData();
            formData.append("id", item.id.toString());
            formData.append("photo", file);

            const response = await sendRequest(
                "https://localhost:44315/api/admin/group-page/members/photo",
                "PATCH",
                formData
            );

            if (response.status === 204) {
                alert("Дані успішно змінено");
                OnHideModal();
            } else {
                alert("Сталася помилка при зміні");
            }
        } catch (error) {
            alert("Помилка при збереженні даних.");
        }
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append("id", item.id.toString());
            formData.append("fullName", fullNameRef.current?.value || "");
            formData.append("description", descriptionRef.current?.value || "");
            formData.append("role", roleRef.current?.value || "");

            const response = await sendRequest(
                "https://localhost:44315/api/admin/group-pages/members",
                "PATCH",
                formData,
                {"Content-Type": "application/json"}
            );

            if (response.status === 204) {
                alert("Інформацію про учасника успішно оновлено!");
                OnHideModal();
            } else {
                alert("Помилка при оновленні інформації учасника.");
            }
        } catch (error) {
            alert("Помилка при збереженні даних.");
        }
    };

    const handleShowModal = () => {
        OnShowModal(
            <div>
                <Form>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{ color: "white" }}>
                            Фото учасника:
                        </Form.Label>
                        <input
                            ref={photoRef}
                            type="file"
                            accept="image/*"
                            className="form-control"
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </div>
                    <Button className="mt-3" onClick={handlePhotoEdit}>
                        Змінити фото
                    </Button>
                </Form>
                <Form>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{ color: "white" }}>
                            Повне ім’я:
                        </Form.Label>
                        <Form.Control
                            ref={fullNameRef}
                            type="text"
                            defaultValue={item.fullName}
                            className="form-control"
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{ color: "white" }}>
                            Опис:
                        </Form.Label>
                        <Form.Control
                            ref={descriptionRef}
                            type="text"
                            defaultValue={item.description}
                            className="form-control"
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <Form.Label className="me-3" style={{ color: "white" }}>
                            Роль:
                        </Form.Label>
                        <Form.Control
                            ref={roleRef}
                            type="text"
                            defaultValue={item.role}
                            className="form-control"
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </div>
                </Form>
                <Button className="mt-3" onClick={handleEdit}>
                    Змінити
                </Button>
            </div>
        );
    };

    return (
        <>
            <Button
                className="btn btn-warning position-absolute top-0 end-0 m-2"
                onClick={handleShowModal}
                title="Редагувати інформацію"
            >
                <FaEdit />
            </Button>
        </>
    );
};

export { GroupMemberEditButton };
