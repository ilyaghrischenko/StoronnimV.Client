import React, { useContext, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext";

const AddAdminModal: React.FC = () => {
    const { OnHideModal, sendRequest } = useContext(GlobalContext)!;
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleAddAdmin = async () => {
        setLoading(true);
        try {
            const response = await sendRequest(
                "/api/admin/add",
                "POST", 
                { login, password }, 
                { "Content-Type": "application/json" }
            );

            if (response.status === 200) {
                console.log("Admin added successfully:", response.data);
                OnHideModal(); 
            } else {
                console.error("Error adding admin:", response.status, response.data);
            }
        } catch (error: any) {
            console.error("Error:", error.message);
        } finally {
            setLoading(false);
        }
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
