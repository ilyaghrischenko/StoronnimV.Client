import React, { useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext";

interface IAddAdminModalProps {
    onAdding: (login: string, password: string) => Promise<void>;
}

const AddAdminModal: React.FC<IAddAdminModalProps> = ({ onAdding }) => {
    const { OnHideModal } = useContext(GlobalContext)!;
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddAdmin = async () => {
        setLoading(true);
        onAdding(login, password);
        setLoading(false);
    };

    return (
        <Modal.Dialog>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: "white" }} className="me-3">Додати Адміна</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formLogin" className="mb-3">
                        <Form.Label style={{ color: "white" }} className="me-3">Логін: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть логін"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label style={{ color: "white" }} className="me-3">Пароль: </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Введіть пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ color: "white", backgroundColor: "#333" }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={OnHideModal}>
                    Закрити
                </Button>
                <Button variant="primary" onClick={handleAddAdmin} disabled={loading}>
                    {loading ? "Завантаження..." : "Додати"}
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
};

export { AddAdminModal };
