import React, {ChangeEvent, FC, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {GlobalContext} from "../../../contexts/shared/GlobalContext.tsx";
import {ISchedule} from "../../../../models/schedule/ISchedule.ts";

interface IScheduleEditModalProps {
    item: ISchedule;
}

const ScheduleEditModal: FC<IScheduleEditModalProps> = ({item}) => {
    const {OnHideModal, sendRequest} = useContext(GlobalContext)!;

    const [title, setTitle] = useState<string>(item.title);
    const [description, setDescription] = useState<string>(item.description);
    const [location, setLocation] = useState<string>(item.location);
    const [performanceDateTime, setPerformanceDateTime] = useState<string>(item.performanceDateTime);
    const [photo, setPhoto] = useState<File>({} as File);

    const formatDateTimeForInput = (dateStr: string): string => {
        if (!dateStr) return "";

        const [datePart, timePart] = dateStr.split(" ");
        const [day, month, year] = datePart?.split(".") ?? [];

        let hours = "00";
        let minutes = "00";

        if (timePart) {
            const timeSplit = timePart.split(".");
            hours = timeSplit[0] ?? "00";
            minutes = timeSplit[1] ?? "00";
        }

        if (!day || !month || !year) return ""; // захист від неправильного формату

        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
    };


    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPhoto(file);
        }
    };

    const handleDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const [datePart, timePart] = e.target.value.split("T"); // "2025-04-30T19:30"
        const [year, month, day] = datePart.split("-");
        const [hours, minutes] = timePart.split(":");

        const formatted = `${day}.${month}.${year} ${hours}.${minutes}`; // формат для backend
        setPerformanceDateTime(formatted);
    };

    const handlePhotoEdit = async () => {
        try {
            if (!photo) {
                alert("Спочатку завантажте фото");
                return;
            }

            const formData = new FormData();
            formData.append("id", item.id.toString());
            formData.append("photo", photo);

            const response = await sendRequest(
                "https://localhost:44315/api/admin/schedules/photo",
                "PATCH",
                formData
            );

            if (response.status === 204) {
                alert("ФОТО УСПІШНО ЗМІНЕНО");
                OnHideModal();
            }
            else {
                alert("ФОТО НЕ ЗМІНЕНО");
            }
        } catch (error) {
            alert("Помилка при зміні фото");
        }
    };

    const handleEdit = async () => {
        try {
            const formData = new FormData();
            formData.append("id", item.id.toString());
            formData.append("title", title);
            formData.append("performanceDateTime", performanceDateTime);
            formData.append("description", description);
            formData.append("location", location);
            console.dir(performanceDateTime);

            const response = await sendRequest(
                "https://localhost:44315/api/admin/schedules",
                "PATCH",
                formData,
                {"Content-Type": "application/json"}
            );

            if (response.status === 204) {
                alert("ДАНІ УСПІШНО ЗМІНЕНО");
                OnHideModal();
            }
            else {
                alert("ДАНІ НЕ ЗМІНЕНО");
            }
        } catch (error) {
            alert("Помилка при зміні фото");
        }
    };

    return (
        <>
            <Form onSubmit={(e) => {
                e.preventDefault();
                handleEdit();
            }}>
                <Form.Group controlId="formTitle">
                    <Form.Label className="form-label" style={{color:"white"}}>Заголовок:</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        style={{color:"black"}}
                    />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label className="form-label" style={{color:"white"}}>Опис:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        style={{color:"black"}}
                    />
                </Form.Group>

                <Form.Group controlId="formLocation" className="mt-3">
                    <Form.Label className="form-label" style={{color:"white"}}>Місце проведення:</Form.Label>
                    <Form.Control
                        type="text"
                        value={location}
                        required
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-control"
                        style={{color:"black"}}
                    />
                </Form.Group>

                <Form.Group controlId="formPerformanceDateTime" className="mt-3">
                    <Form.Label className="form-label" style={{color:"white"}}>Дата та час проведення:</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        value={formatDateTimeForInput(performanceDateTime)}
                        required
                        onChange={handleDateTimeChange}
                        className="form-control"
                        style={{ color: "black" }}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100">
                    Зберегти зміни
                </Button>
            </Form>

            <Form onSubmit={(e) => {
                e.preventDefault();
                handlePhotoEdit();
            }}>
                <Form.Group controlId="formPhoto" className="mt-3">
                    <Form.Label className="form-label" style={{color:"white"}}>Фото:</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        onChange={handlePhotoUpload}
                        accept="image/*"
                        className="form-control"
                        style={{color:"black"}}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3 w-100">
                    Зберегти фото
                </Button>
            </Form>
        </>
    );
};

export {ScheduleEditModal};