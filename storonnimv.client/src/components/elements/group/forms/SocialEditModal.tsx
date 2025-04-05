import {FC, useContext, useState} from "react";
import {ISocialNetwork} from "../../../../models/group/IMemberInfo.ts";
import {Button, Form} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";

interface ISocialEditModalProps {
    item: ISocialNetwork;
}

const SocialEditModal: FC<ISocialEditModalProps> = ({ item }) => {
    const {sendRequest, OnHideModal} = useContext(GlobalContext)!;

    const [name, setName] = useState<string>(item.socialNetwork);
    const [url, setUrl] = useState<string>(item.url);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("id", item.id.toString());
            formData.append("type", name);
            formData.append("url", url);

            const response = await sendRequest(
                "https://localhost:44315/api/admin/socials",
                "PATCH",
                formData,
                {"Content-Type": "application/json"}
            );

            if (response.status === 204) {
                alert('Соціальну мережу успішно змінено');
                OnHideModal();
            } else {
                alert('Соціальну мережу не змінено');
            }
        } catch (error) {
            alert('ПОМИЛКА ПРИ ЗМІНІ СОЦІАЛЬНОЇ МЕРЕЖІ');
        }
    };

    return (
        <Form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
        }}>
            <Form.Group className="form-group">
                <Form.Label
                    className="form-group__label"
                    style={{color:"white"}}
                >
                    Назва соціальної мережі:
                </Form.Label>
                <Form.Control
                    type="text"
                    className="form-group__control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="form-group">
                <Form.Label
                    className="form-group__label"
                    style={{color:"white"}}
                >
                    Посилання:
                </Form.Label>
                <Form.Control
                    type="text"
                    className="form-group__control"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </Form.Group>

            <Button type="submit">Змінити</Button>
        </Form>
    );
};

export {SocialEditModal};