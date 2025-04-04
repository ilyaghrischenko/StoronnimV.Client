import {FC, useContext } from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import {EditGroupModal} from "../../group/forms/EditGroupModal.tsx";
import {GroupContext} from "../../../contexts/GroupContext.tsx";

const GroupInfoEditButton: FC = () => {
    const { OnShowModal } = useContext(GlobalContext)!;
    const { fullInfo } = useContext(GroupContext)!;

    const openEditModal = () => {
        OnShowModal(<EditGroupModal fullInfo={fullInfo} />);
    };

    return (
        <Button variant="primary" onClick={openEditModal}>
            <FaEdit />
        </Button>
    );
};

export { GroupInfoEditButton };
