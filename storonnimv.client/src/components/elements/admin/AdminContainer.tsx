import { FC, useState } from "react";
import { Admin } from "../../pages/Admin.tsx";
import { BasicAdmins } from "../admin/BasicAdmins.tsx";

const sampleAdmins = [
    { id: 1, login: "admin1" },
    { id: 2, login: "admin2" },
];

const AdminContainer: FC = () => {
    const [admins, setAdmins] = useState(sampleAdmins);

    const handleDelete = (adminId: number) => {
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminId));
    };

    const handleEdit = (admin: { id: number; login: string }) => {
        console.log("Edit admin", admin);
    };

    return <Admin children={<BasicAdmins admins={admins} onDelete={handleDelete} onEdit={handleEdit} />} />;
};

export { AdminContainer };
