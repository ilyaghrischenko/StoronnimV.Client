import {FC, useContext, useEffect} from "react";
import {GlobalContext} from "../../contexts/shared/GlobalContext";
import {PageLoading} from "../shared/PageLoading";
import {List} from "../shared/GenericList/List";
import {ListItem} from "../shared/GenericList/ListItem";
import {VideoContext} from "../../contexts/VideoContext";
import {useNavigate, useSearchParams} from "react-router-dom";
import {IVideoModel} from "../../../models/video/IVideoModel";
import {VideoListItem} from "./VideoListItem";
import {PaginationSection} from "../shared/PaginationSection.tsx";

const VideoList: FC = () => {

    const videoCategories = [
        "Performance",
        "Backstage",
        "Repetition"
    ]

    const [searchParams] = useSearchParams();
    const videoType = searchParams.get("videoType") || "Performance";

    const navigate = useNavigate();

    if (!videoCategories.includes(videoType)) {
        navigate(`/error?statusCode=404&message=Video%20type%20not%20found`);
    }

    const videoContext = useContext(VideoContext);
    const globalContext = useContext(GlobalContext);

    if (!videoType) {
        throw new Error("Video id must be provided");
    }
    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }
    if (!videoContext) {
        throw new Error("VideoContext must be used within a VideoContextProvider");
    }

    const {pageLoading} = globalContext;
    const {videoList, currentPage, totalPages, paginate} = videoContext;

    useEffect(() => {
        const savedPage = sessionStorage.getItem("videoCurrentPage");
        const page = savedPage ? Number(savedPage) : 1;

        paginate(videoType, page, 2);
    }, []);

    if (pageLoading) {
        return <PageLoading elementsCount={2} columns={2} />;
    }

    const onBackButtonClick = () => {
        navigate('/video/sections');
    };

    return (
        <div
            className="video-list-container"
            onClick={onBackButtonClick}
        >
            <button className="video-btn">
                <span className="icon">&#x276E;</span>
                <span className="label">VIDEO</span>
            </button>

            <List
                className="video-list"
                items={videoList}
                renderItem={(item: IVideoModel) => (
                    <ListItem
                        className="video-list__item"
                        item={item}
                        renderItem={(item: IVideoModel) => (
                            <VideoListItem videoItem={item}/>
                        )}
                    />
                )}
            ></List>

            {/* Элементы управления пагинацией */}
            <PaginationSection
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={(page) => paginate(videoType, page, 2)}
            />
        </div>
    );
};

export {VideoList};
