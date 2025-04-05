import {FC, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";

interface ISocialAddModalProps {
    memberId: number;
}

const SocialAddModal: FC<ISocialAddModalProps> = ({ memberId }) => {
    const {sendRequest, OnHideModal} = useContext(GlobalContext)!;

    const [name, setName] = useState<string>("");
    const [url, setUrl] = useState<string>("");

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("memberId", memberId.toString());
        formData.append("url", url);
        formData.append("type", name);

        try {
            const response = await sendRequest(
                "https://localhost:44315/api/admin/socials",
                'POST',
                formData,
                {"Content-Type": "application/json"}
            );

            if (response.status === 201) {
                alert('Соціальну мережу успішно додано');
                OnHideModal();
            } else {
                alert('Соціальну мережу не додано');
            }
        } catch (error) {
            alert('Помилка при додаванні соціальної мережі');
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
                    Назва:
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

            <Button type="submit">Додати</Button>
        </Form>
    );
};

export { SocialAddModal };