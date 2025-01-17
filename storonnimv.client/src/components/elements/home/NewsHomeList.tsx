import {Container} from "react-bootstrap";
import {List} from "../shared/GenericList/List";
import {FC, useContext, useEffect} from "react";
import {GlobalContext} from "../../contexts/shared/GlobalContext";
import {HomeContext} from "../../contexts/HomeContext";
import {IHomeNewsItem} from "../../../models/home/IHomeNewsItem";
import {ListItem} from "../shared/GenericList/ListItem";
import {NewsHomeListItem} from "./NewsHomeListItem";
import {Loading} from "../shared/Loading";

const NewsHomeList: FC = () => {
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
            className='home-news-list'
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