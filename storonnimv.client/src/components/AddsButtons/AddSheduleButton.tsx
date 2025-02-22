import { useContext, FC } from "react";
import { GlobalContext } from "../contexts/shared/GlobalContext.tsx";
import { Button } from "react-bootstrap";
import { ScheduleContentModal } from "../elements/button/ScheduleContentModal.tsx";
import { IoAddCircleSharp } from "react-icons/io5";

interface AddScheduleButtonProps {
    apiUrl: string;
    modalTitle: string;
    buttonLabel: string;
}

const AddScheduleButton: FC<AddScheduleButtonProps> = ({ apiUrl, modalTitle }) => {
    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    const { OnShowModal } = context;

    if (!sessionStorage.getItem("token")) {
        return null;
    }

    const handleClick = () => {
        OnShowModal(<ScheduleContentModal apiUrl={apiUrl} modalTitle={modalTitle} />);
    };

    return (
        <Button onClick={handleClick} variant="primary">
            <IoAddCircleSharp />
        </Button>
    );
};

export { AddScheduleButton };
