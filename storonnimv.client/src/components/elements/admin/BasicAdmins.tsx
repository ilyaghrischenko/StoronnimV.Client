import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { GlobalContext } from "../../contexts/shared/GlobalContext";
import { AddAdminModal } from "./SuperAdminButtons/AddAdminModal.tsx";
import { EditAdminModal } from "./SuperAdminButtons/EditAdminModal.tsx";
import { DeleteAdminModal } from "./SuperAdminButtons/DeleteAdminModal.tsx";

interface Admin {
    id: number;
    login: string;
}

interface BasicAdminsProps {
    admins: Admin[];
    onDelete: (id: number) => void;
    onEdit: (admin: Admin) => void;
}

const BasicAdmins: React.FC<BasicAdminsProps> = ({ admins, onDelete }) => {
    const { OnShowModal } = useContext(GlobalContext)!;

    const handleEdit = (admin: Admin) => {
        OnShowModal(<EditAdminModal admin={admin} />);
    };

    const handleDelete = (admin: Admin) => {
        OnShowModal(<DeleteAdminModal adminId={admin.id} onDelete={onDelete} />);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => OnShowModal(<AddAdminModal />)}>
                Додати Адміна
            </Button>
            <h2 className="mt-3">Список Адмінів</h2>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Логін</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>{admin.login}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEdit(admin)}>
                                    Змінити
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(admin)}
                                >
                                    Видалити
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export { BasicAdmins };
