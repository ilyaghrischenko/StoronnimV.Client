import {IGroupInfo} from "../../../../models/group/IGroupInfo.ts";
import {FC} from "react";
import {Button, Image} from "react-bootstrap";

interface IAdminGroupInfoProps {
    item: IGroupInfo;
}

const AdminGroupInfo: FC<IAdminGroupInfoProps> = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>
                <Image className='admin-photo' src={item.photoUrl} />
            </td>
            <td>{item.description}</td>
            <td><Button>edit</Button></td>
            <td><Button>del</Button></td>
        </tr>
    );
};

export {AdminGroupInfo};