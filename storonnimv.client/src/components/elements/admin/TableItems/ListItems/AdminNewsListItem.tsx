import {IAdminNewsItem} from "../../../../../models/admin/IAdminNewsItem.ts";
import {FC, useContext} from "react";
import {Button, Image} from "react-bootstrap";
import {AdminContext} from "../../../../contexts/AdminContext.tsx";

interface IAdminNewsListItemProps {
    item: IAdminNewsItem;
}

const AdminNewsListItem: FC<IAdminNewsListItemProps> = ({item}) => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error('AdminContext must be used within a AdminContextProvider');
    }

    const {handleDelete, handleEdit} = adminContext;

    return (
        <tr>
            <td>{item.id}</td>
            <td>
                {item.photo ? <Image className='admin-photo' src={item.photo} /> : <p>null</p>}
            </td>
            <td>
                {item.video ? <video
                    className='admin-video'
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
            <td>
                //TODO:!!!!!
                <Button onClick={() => handleEdit('TODO')}>edit</Button>
            </td>
            <td>
                //TODO:!!!!!
                <Button onClick={() => handleDelete('TODO')}>del</Button>
            </td>
        </tr>
    );
};

export {AdminNewsListItem};