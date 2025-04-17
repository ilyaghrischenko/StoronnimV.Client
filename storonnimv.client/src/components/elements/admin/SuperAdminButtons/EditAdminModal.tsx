import React, {useContext, useState} from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext";
import {ValidationErrors} from "../ValidationErrors.tsx";

interface EditAdminModalProps {
    admin: { id: number; login: string };
    onLoginEdit: (adminId: number, newLogin: string) => Promise<void>;
    onPasswordEdit: (adminId: number, oldPassword: string, newPassword: string) => Promise<void>;
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({admin, onLoginEdit, onPasswordEdit}) => {
    const globalContext = useContext(GlobalContext)!;

    const {OnHideModal, validationErrors, setModalLoading, modalLoading} = globalContext;

    const [login, setLogin] = useState<string>(admin.login);
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleLoginEdit = async (newLogin: string) => {
        setModalLoading(true);
        try {
            await onLoginEdit(admin.id, newLogin);
            alert("Логін успішно змінений!");
            window.location.reload();
        } catch (error) {
            console.error("Помилка при зміні логіна адміна:", error);
            alert("Сталася помилка при зміні логіна адміна!");
        } finally {
            setModalLoading(false);
            OnHideModal();
        }
    };

    const handlePasswordEdit = async (oldPassword: string, newPassword: string) => {
        setModalLoading(true);
        try {
            await onPasswordEdit(admin.id, oldPassword, newPassword);
            alert("Пароль успішно змінений!");
            window.location.reload();
        } catch (error) {
            console.error("Помилка при зміні пароля адміна:", error);
            alert("Сталася помилка при зміні пароля адміна!");
        } finally {
            setModalLoading(false);
            OnHideModal();
        }
    };

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title style={{color: "white"}} className="me-3">Змінити дані Адміністратора</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label style={{color: "white"}} className="me-3">Новий Логін: </Form.Label>
                        <Form.Control
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            style={{color: "white", backgroundColor: "#333"}}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handleLoginEdit(login)} disabled={modalLoading}
                            className="mb-3">
                        {modalLoading ? "Завантаження..." : "Змінити логін"}
                    </Button>

                    ]
                    <Form.Group className="mb-3">
                        <Form.Label style={{color: "white"}} className="me-3">Старий Пароль: </Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{color: "white", backgroundColor: "#333"}}
                            placeholder="Введіть старий пароль"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{color: "white"}} className="me-3">Новий Пароль: </Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{color: "white", backgroundColor: "#333"}}
                            placeholder="Введіть новий пароль"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{color: "white"}} className="me-3">Підтвердження пароля: </Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{color: "white", backgroundColor: "#333"}}
                            placeholder="Підтвердження пароля"
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={() => handlePasswordEdit(newPassword, confirmPassword)}
                            disabled={modalLoading}>
                        {modalLoading ? "Завантаження..." : "Змінити пароль"}
                    </Button>

                    {validationErrors && Object.keys(validationErrors).length > 0 &&
                        <ValidationErrors errors={validationErrors}/>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={OnHideModal}>
                    Закрити
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
};

export {EditAdminModal};
