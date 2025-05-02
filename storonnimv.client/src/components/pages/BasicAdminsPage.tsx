// import { FC, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { BasicAdmins } from "../elements/admin/BasicAdmins";
// import { IBasicAdmin } from "../../models/admin/IBasicAdmin";
//
// const BasicAdminsPage: FC = () => {
//     const navigate = useNavigate();
//     const [admins, setAdmins] = useState<IBasicAdmin[]>([]);
//
//     useEffect(() => {
//         const fetchedAdmins: IBasicAdmin[] = [
//             { id: 1, login: "admin1" },
//             { id: 2, login: "admin2" },
//         ];
//         setAdmins(fetchedAdmins);
//     }, []);
//
//     const handleDelete = async (adminId: number) => {
//         setAdmins(admins.filter(admin => admin.id !== adminId));
//     };
//
//     const handleEdit = (admin: IBasicAdmin) => {
//         navigate(`/admin/basic-admins/edit/${admin.id}`);
//     };
//
//     return (
//         <div>
//             <h1>Список Адмінів</h1>
//             <BasicAdmins admins={admins} onDelete={handleDelete} onEdit={handleEdit} />
//         </div>
//     );
// };
//
// export { BasicAdminsPage };
