import { useContext, FC } from "react";
import { GlobalContext } from "../contexts/shared/GlobalContext";
import { Button } from "react-bootstrap";
import { AddMemberModal } from "../elements/button/AddMemberModal";
import { IoAddCircleSharp } from "react-icons/io5";

interface AddGroupButtonProps {
    buttonLabel: string;
}

const AddGroupButton: FC<AddGroupButtonProps> = ({ }) => {
    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    const { OnShowModal } = context;

    if (!sessionStorage.getItem("token")) {
        return null;
    }

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
