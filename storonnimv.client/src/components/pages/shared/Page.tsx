import {FC} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "../Home";
import {Schedule} from "../Schedule";
import {News} from "../News";
import {Music} from "../Music";
import {Group} from "../Group";
import {Video} from "../Video";
import {VideoSections} from "../../elements/video/VideoSections";
import {VideoList} from "../../elements/video/VideoList";
import {Admin} from "../Admin.tsx";
import {AuthForm} from "../../elements/admin/AuthForm.tsx";
import {Error} from "../Error.tsx";
import {ProtectedRoute} from "../../elements/admin/ProtectedRoute.tsx";
import {BasicAdmins} from "../../elements/admin/BasicAdmins.tsx";

const Page: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/schedule" element={<Schedule />}/>
            <Route path="/news" element={<News />}/>
            <Route path="/music" element={<Music />}/>
            <Route path="/group" element={<Group />}/>

            <Route path="/video/sections" element={<Video children={<VideoSections
                topImage={"https://th.bing.com/th/id/OIP.sl5zuf2713AebuRLfZOJeAHaE6?rs=1&pid=ImgDetMain"}
                bottomLeftImage={"https://th.bing.com/th/id/OIP.la8muzOTU5XTOEJVZsOSgAHaE5?rs=1&pid=ImgDetMain"}
                bottomRightImage={"https://klike.net/uploads/posts/2020-04/1587718623_10.jpg"}
            />} />}/>
            <Route path="/video/section/:id" element={<Video children={<VideoList/>} />}/>

            <Route path="/admin" element={<Admin children={<AuthForm />} />}/>

            <Route path="/admin/basic-admins" element={
                <ProtectedRoute>
                    <Admin children={<BasicAdmins />} />
                </ProtectedRoute>
            }/>

            <Route path="/error" element={<Error/>}/>
            <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
    );
};

export {Page};