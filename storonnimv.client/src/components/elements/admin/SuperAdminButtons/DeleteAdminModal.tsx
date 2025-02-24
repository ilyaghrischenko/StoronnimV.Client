import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GlobalContext } from "../../../contexts/shared/GlobalContext";

interface DeleteAdminModalProps {
    adminId: string;
    onDelete: (id: string) => void;
}

const DeleteAdminModal: React.FC<DeleteAdminModalProps> = ({ adminId, onDelete }) => {
    const { OnHideModal, sendRequest } = useContext(GlobalContext)!;
    const [loading, setLoading] = useState<boolean>(false);

    const handleDeleteAdmin = async () => {
        setLoading(true);
        try {
            const response = await sendRequest(
                `/api/admin/delete/${adminId}`,
                "DELETE"
            );

            if (response.status === 200) {
                onDelete(adminId);
                OnHideModal();
            } else {
                console.error("Error deleting admin:", response.status, response.data);
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
                <Modal.Title style={{ color: "white" }} className="me-3">Підтвердження видалення</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label style={{ color: "white" }} className="me-3">
                    Ви дійсно хочете видалити цього адміна?
                </label>
            </Modal.Body>
            <Modal.Footer>
                 <Button variant="danger" onClick={handleDeleteAdmin} disabled={loading}>
                    {loading ? "Завантаження..." : "Так"}
                </Button>
                <Button variant="secondary" onClick={OnHideModal}>
                    Ні
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    );
};

export { DeleteAdminModal };
