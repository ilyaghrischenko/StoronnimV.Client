import {FC, useContext} from "react";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {INewsFullItem} from "../../../../models/news/INewsFullItem.ts";
import {FaEdit} from "react-icons/fa";
import {EditNewsItemModalContent} from "../../news/forms/EditNewsItemModalContent.tsx";

interface NewsEditButtonProps {
    newsItem: INewsFullItem;
}

const NewsEditButton: FC<NewsEditButtonProps> = ({newsItem}) => {

    const {OnShowModal} = useContext(GlobalContext)!;

    return (
        <button className="btn btn-warning position-fixed bottom-0 right-0 m-3"
                onClick={() => OnShowModal(<EditNewsItemModalContent newsItem={newsItem}/>)}>
            <FaEdit/>
        </button>
    );
};

export {NewsEditButton};
