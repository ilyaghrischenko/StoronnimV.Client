import {useContext, FC} from "react";
import {Button} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {FaEdit} from "react-icons/fa";
import {ScheduleEditModal} from "../../schedule/forms/ScheduleEditModal.tsx";
import {ISchedule} from "../../../../models/schedule/ISchedule.ts";

interface ScheduleEditButtonProps {
    item: ISchedule;
}

const ScheduleEditButton: FC<ScheduleEditButtonProps> = ({ item }) => {
    const {OnShowModal} = useContext(GlobalContext)!;

    const handleClick = () => {
        OnShowModal(<ScheduleEditModal item={item} />);
    };

    return (
        <Button onClick={handleClick} variant="warning" className="position-absolute top-0 end-0 m-2">
            <FaEdit/>
        </Button>
    );
};

export {ScheduleEditButton};
