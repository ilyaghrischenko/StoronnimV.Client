import React, { useContext, useState } from "react";
import {GlobalContext} from "../contexts/shared/GlobalContext.tsx"; 
import { Button, Form } from "react-bootstrap";
import { AxiosResponse } from "axios";

interface AddContentButtonProps {
    apiUrl: string; 
    modalTitle: string; 
    buttonLabel: string; 
}

const AddContentButton: React.FC<AddContentButtonProps> = ({ apiUrl, modalTitle, buttonLabel }) => {
    const context = useContext(GlobalContext);

    if (!context) {
        return null;
    }

    // TODO: ПОМЕНЯТЬ МОДАЛЬНОЕ ОКНО ИЗ GlobalContext НА ОКНО ИЗ ContentModal
    const { OnShowModal, sendRequest } = context;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "description") {
            setDescription(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const contentData = {
            title,
            description,
        };

        try {
            const response: AxiosResponse = await sendRequest(apiUrl, "POST", contentData);
            if (response.status === 200) {
                alert(`${modalTitle} додано успішно!`);
                context.OnHideModal();
            }
        } catch (error) {
            alert(`Помилка під час додавання ${modalTitle.toLowerCase()}`);
        }
    };

    if (!sessionStorage.getItem("token")) {
        return null;
    }

    const handleClick = () => {
        OnShowModal(
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Заголовок {modalTitle}</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        placeholder={`Введіть заголовок ${modalTitle}`}
                    />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Опис {modalTitle}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={description}
                        onChange={handleChange}
                        placeholder={`Введіть опис ${modalTitle}`}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Добавить {modalTitle}
                </Button>
            </Form>,
            modalTitle
        );
    };

    return (
        <Button onClick={handleClick} variant="primary">
            {buttonLabel}
        </Button>
    );
};

export { AddContentButton };
