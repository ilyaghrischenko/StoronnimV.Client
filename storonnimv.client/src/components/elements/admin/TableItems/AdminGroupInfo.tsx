import {IGroupInfo} from "../../../../models/group/IGroupInfo.ts";
import {FC} from "react";

interface IAdminGroupInfoProps {
    item: IGroupInfo;
}

const AdminGroupInfo: FC<IAdminGroupInfoProps> = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.photoUrl}</td>
            <td>{item.description}</td>
        </tr>
    );
};

export {AdminGroupInfo};