import { useContext, FC, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { GlobalContext } from "../contexts/shared/GlobalContext.tsx";
import { FaEdit } from "react-icons/fa";

interface ScheduleEditButtonProps {
    apiUrl: string;
    modalTitle: string;
    scheduleData: any; 
}

const ScheduleEditButton: FC<ScheduleEditButtonProps> = ({ apiUrl, modalTitle, scheduleData }) => {
    const context = useContext(GlobalContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(scheduleData.title || "");
    const [description, setDescription] = useState<string>(scheduleData.description || "");
    const [location, setLocation] = useState<string>(scheduleData.location || "");
    const [performanceDateTime, setPerformanceDateTime] = useState<string>(scheduleData.performanceDateTime || "");
    const [photo, setPhoto] = useState<File | null>(null);
    const [, setLoading] = useState<boolean>(false);

    if (!context) {
        return null;
    }

    const { sendRequest } = context;

    const handleClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        else if (name === "description") setDescription(value);
        else if (name === "location") setLocation(value);
        else if (name === "performanceDateTime") setPerformanceDateTime(value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            setPhoto(file);
        } else {
            alert("Будь ласка, завантажте тільки зображення.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("location", location);
        formData.append("status", "active"); 
        formData.append("performanceDateTime", performanceDateTime);
        if (photo) formData.append("photo", photo);

        try {
            const response = await sendRequest(`${apiUrl}/${scheduleData.id}`, "PUT", formData);
            if (response.status === 200) {
                alert(`${modalTitle} успішно змінено!`);
                handleCloseModal();
            }
        } catch (error) {
            alert(`Помилка при зміні ${modalTitle.toLowerCase()}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={handleClick} variant="warning" className="position-absolute top-0 end-0 m-2">
                <FaEdit />
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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

                        <Form.Group controlId="formDescription" className="mt-3">
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

                        <Form.Group controlId="formLocation" className="mt-3">
                            <Form.Label>Місце проведення {modalTitle}</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={location}
                                onChange={handleChange}
                                placeholder={`Введіть місце проведення ${modalTitle}`}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPerformanceDateTime" className="mt-3">
                            <Form.Label>Дата та час проведення {modalTitle}</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="performanceDateTime"
                                value={performanceDateTime}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoto" className="mt-3">
                            <Form.Label>Фото {modalTitle}</Form.Label>
                            <Form.Control
                                type="file"
                                name="photo"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3 w-100">
                            Зберегти зміни
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export { ScheduleEditButton };
