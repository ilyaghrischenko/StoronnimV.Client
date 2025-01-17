import {List} from "../shared/GenericList/List";
import {FC, useContext, useEffect} from "react";
import {HomeContext} from "../../contexts/HomeContext";
import {IHomeNewsItem} from "../../../models/home/IHomeNewsItem";
import {ListItem} from "../shared/GenericList/ListItem";
import {NewsHomeListItem} from "./NewsHomeListItem";
import {Loading} from "../shared/Loading";

import '../../../styles/elements/home/NewsHomeList.css';

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
            <Loading />
        );
    }

    return (
        <List
            className={`home-news-list ${className}`}
            items={homeNewsList}
            renderItem={(item: IHomeNewsItem) => (
                <ListItem
                    className='home-news-list-item'
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