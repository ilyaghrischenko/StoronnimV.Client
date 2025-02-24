import { FC, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Home";
import { Schedule } from "../Schedule";
import { News } from "../News";
import { Music } from "../Music";
import { Group } from "../Group";
import { Video } from "../Video";
import { VideoSections } from "../../elements/video/VideoSections";
import { VideoList } from "../../elements/video/VideoList";
import { Admin } from "../Admin.tsx";
import { AuthForm } from "../../elements/admin/AuthForm.tsx";
import { Error } from "../Error.tsx";
import { ProtectedRoute } from "../../elements/admin/ProtectedRoute.tsx";
import { BasicAdmins } from "../../elements/admin/BasicAdmins.tsx";
import { ForbiddenPage } from "../../pages/ForbiddenPage.tsx";

// Пример данных для администраторов
const sampleAdmins = [
    { id: "1", login: "admin1" },
    { id: "2", login: "admin2" },
];

const Page: FC = () => {
    const [admins, setAdmins] = useState(sampleAdmins);

    const handleDelete = (adminId: string) => {
        setAdmins(admins.filter(admin => admin.id !== adminId));
    };

    const handleEdit = (admin: { id: string; login: string }) => {
        // Логика редактирования админа
        console.log("Edit admin", admin);
    };

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/group" element={<Group />} />
            <Route path="/video/sections" element={<Video children={<VideoSections />} />} />
            <Route path="/video/section/:id" element={<Video children={<VideoList />} />} />
            <Route path="/admin" element={<Admin children={<AuthForm />} />} />
            
            <Route
                path="/admin/basic-admins"
                element={
                    <ProtectedRoute requiredRole="SuperAdmin">
                        <Admin
                            children={<BasicAdmins admins={admins} onDelete={handleDelete} onEdit={handleEdit} />}
                        />
                    </ProtectedRoute>
                }
            />
            
            <Route path="/error" element={<Error />} />
            <Route path="/403" element={<ForbiddenPage />} />
            <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
    );
};

export { Page };
