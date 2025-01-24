import {IAdminNewsItem} from "../../../../models/admin/IAdminNewsItem.ts";
import {FC} from "react";
import {Image} from "react-bootstrap";

interface IAdminNewsListItemProps {
    item: IAdminNewsItem;
}

const AdminNewsListItem: FC<IAdminNewsListItemProps> = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>
                {item.photo ? <Image src={item.photo} /> : <p>null</p>}
            </td>
            <td>
                {item.video ? <video
                    controls
                    preload="auto" // Видео будет загружаться для захвата кадра
                >
                    <source src={item.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                : <p>null</p>}
            </td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.priority}</td>
            <td>{item.date}</td>
        </tr>
    );
};

export {AdminNewsListItem};