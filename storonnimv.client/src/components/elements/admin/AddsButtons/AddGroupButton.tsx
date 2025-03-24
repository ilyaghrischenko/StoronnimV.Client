import { useContext, FC } from "react";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { Button } from "react-bootstrap";
import { AddMemberModal } from "../../button/AddMemberModal.tsx";
import { IoAddCircleSharp } from "react-icons/io5";

const AddGroupButton: FC = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    const { OnShowModal } = context;

    const handleClick = () => {
        OnShowModal(<AddMemberModal modalTitle="Додати учасника" />);
    };

    return (
        <Button onClick={handleClick} variant="primary">
            <IoAddCircleSharp />
        </Button>
    );
};

export { AddGroupButton };
