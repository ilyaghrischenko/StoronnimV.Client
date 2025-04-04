import {FC, useContext} from "react";
import {Button} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {IMemberFullInfo} from "../../../../models/group/IMemberInfo.ts";
import {FaEdit} from "react-icons/fa";
import {EditMemberModal} from "../../group/forms/EditMemberModal.tsx";

interface GroupMemberEditButtonProps {
    item: IMemberFullInfo;
}

const GroupMemberEditButton: FC<GroupMemberEditButtonProps> = ({item}) => {
    const {OnShowModal} = useContext(GlobalContext)!;

    const handleShowModal = () => {
        OnShowModal(<EditMemberModal item={item} />);
    };

    return (
        <Button
            className="btn btn-warning position-absolute top-0 end-0 m-2"
            onClick={handleShowModal}
            title="Редагувати інформацію"
        >
            <FaEdit/>
        </Button>
    );
};

export {GroupMemberEditButton};
