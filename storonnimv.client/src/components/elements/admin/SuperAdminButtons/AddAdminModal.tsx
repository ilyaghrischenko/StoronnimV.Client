import React, {useContext, useState} from "react";
import {Button, Modal, Form} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext";
import {ValidationErrors} from "../ValidationErrors.tsx";

interface IAddAdminModalProps {
    onAdding: (login: string, password: string) => Promise<void>;
}

const AddAdminModal: React.FC<IAddAdminModalProps> = ({onAdding}) => {
    const globalContext = useContext(GlobalContext)!;

    const {OnHideModal, validationErrors, setModalLoading, modalLoading} = globalContext;

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleAddAdmin = async () => {
        setModalLoading(true);
        try {
            await onAdding(login, password); // Ждем завершения добавления
            alert("Адмін успішно доданий!");
            window.location.reload();
        } catch (error) {
            console.error("Помилка при додаванні адміна:", error);
            alert("Сталася помилка при додаванні адміна!");
        } finally {
            setModalLoading(false);
            OnHideModal();
        }
    };

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title style={{color: "white"}} className="me-3">Додати Адміна</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formLogin" className="mb-3">
                        <Form.Label style={{color: "white"}} className="me-3">Логін: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть логін"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            style={{color: "white", backgroundColor: "#333"}}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label style={{color: "white"}} className="me-3">Пароль: </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введіть пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{color: "white", backgroundColor: "#333"}}
                        />
                    </Form.Group>

                    {validationErrors && Object.keys(validationErrors).length > 0 &&
                        <ValidationErrors errors={validationErrors}/>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={OnHideModal}>
                    Закрити
                </Button>
                <Button variant="primary" onClick={handleAddAdmin} disabled={modalLoading}>
                    {modalLoading ? "Завантаження..." : "Додати"}
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
};

export {AddAdminModal};
