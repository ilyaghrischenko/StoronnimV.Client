import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "../Home";
import {Schedule} from "../Schedule";
import {News} from "../News";
import {Music} from "../Music";
import {Group} from "../Group";
import {Video} from "../Video";

const Page: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/schedule" element={<Schedule />}/>
            <Route path="/news" element={<News />}/>
            <Route path="/music" element={<Music />}/>
            <Route path="/group" element={<Group />}/>
            <Route path="/video" element={<Video />}/>
        </Routes>
    );
};

export {Page};