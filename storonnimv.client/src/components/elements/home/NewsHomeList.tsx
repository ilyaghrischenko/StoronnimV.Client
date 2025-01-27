import {List} from "../shared/GenericList/List";
import {FC, useContext, useEffect} from "react";
import {HomeContext} from "../../contexts/HomeContext";
import {IHomeNewsItem} from "../../../models/home/IHomeNewsItem";
import {ListItem} from "../shared/GenericList/ListItem";
import {NewsHomeListItem} from "./NewsHomeListItem";
import {PageLoading} from "../shared/PageLoading";

interface NewsHomeListProps {
    className?: string;
}

const NewsHomeList: FC<NewsHomeListProps> = ({className}) => {
    const homeContext = useContext(HomeContext);

    if (!homeContext) {
        throw new Error("HomeContext must be used within a HomeContextProvider");
    }

    const {homeNewsList, fetchHomeNewsList, onClickHomeElementHandler, loading} = homeContext;

    useEffect(() => {
        fetchHomeNewsList();
    }, []);

    if (loading) {
        return (
            <PageLoading />
        );
    }

    return (
        <List
            className={`news-home-list ${className}`}
            items={homeNewsList}
            renderItem={(item: IHomeNewsItem) => (
                <ListItem
                    item={item}
                    renderItem={(item: IHomeNewsItem) =>
                        <NewsHomeListItem key={item.id} item={item} />}
                    onClick={() => onClickHomeElementHandler('news')}
                />
            )}
        >
        </List>
    );
};

export { NewsHomeList };