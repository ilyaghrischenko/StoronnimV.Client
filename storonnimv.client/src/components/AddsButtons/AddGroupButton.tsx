import { useContext, FC } from "react";
import { GlobalContext } from "../contexts/shared/GlobalContext";
import { Button } from "react-bootstrap";
import { AddMemberModal } from "../elements/button/AddMemberModal";

interface AddGroupButtonProps {
    buttonLabel: string;
}

const AddGroupButton: FC<AddGroupButtonProps> = ({ buttonLabel }) => {
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
            {buttonLabel}
        </Button>
    );
};

export { AddGroupButton };
