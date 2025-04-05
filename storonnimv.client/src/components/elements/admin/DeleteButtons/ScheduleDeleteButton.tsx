import {useContext, FC} from "react";
import {Button} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {MdDeleteForever} from "react-icons/md";
import {ScheduleDeleteModal} from "../../schedule/forms/ScheduleDeleteModal.tsx";
import {ISchedule} from "../../../../models/schedule/ISchedule.ts";

interface ScheduleDeleteButtonProps {
    item: ISchedule;
}

const ScheduleDeleteButton: FC<ScheduleDeleteButtonProps> = ({item}) => {
    const {OnShowModal} = useContext(GlobalContext)!;

    const handleShowModal = () => {
        OnShowModal(<ScheduleDeleteModal itemId={item.id} />);
    };

    return (
        <Button onClick={handleShowModal} variant="danger" className="position-absolute top-0 end-0 m-2">
            <MdDeleteForever/>
        </Button>
    );
};

export {ScheduleDeleteButton};
