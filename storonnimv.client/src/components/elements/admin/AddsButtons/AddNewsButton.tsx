import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { Button } from "react-bootstrap";
import { NewsContentModal } from "../../button/NewsContentModal.tsx";
import { IoAddCircleSharp } from "react-icons/io5";

const AddNewsButton: React.FC = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    const { OnShowModal } = context;

    const handleClick = () => {
        OnShowModal(<NewsContentModal apiUrl="/api/news" modalTitle="Додати новину" />);
    };    

    return (
        <Button onClick={handleClick} variant="primary">
            <IoAddCircleSharp />
        </Button>
    );
};

export { AddNewsButton };


// TODO: Нужно прописать отправление данных на сервер чтобы они обробатывались и добавлялись на страницу