import { FC, useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../../contexts/shared/GlobalContext.tsx";
import { INewsFullItem } from "../../../../models/news/INewsFullItem.ts";
import { FaEdit } from "react-icons/fa";

interface NewsEditButtonProps {
    newsItem: INewsFullItem;
}

const NewsEditButton: FC<NewsEditButtonProps> = ({ newsItem }) => {
    const globalContext = useContext(GlobalContext);
    const [editedNews, setEditedNews] = useState<INewsFullItem>(newsItem);
    const [newPhoto, setNewPhoto] = useState<File | null>(null);

    if (!globalContext) {
        return null;
    }

    const { OnShowModal, sendRequest, OnHideModal } = globalContext;

    useEffect(() => {
        setEditedNews(newsItem);
    }, [newsItem]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedNews({
            ...editedNews,
            [e.target.name]: e.target.value, 
        });
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            if (newPhoto) {
                formData.append("photo", newPhoto);
            }

            formData.append("title", editedNews.title);
            formData.append("description", editedNews.description);
            formData.append("priority", editedNews.priority);
            formData.append("date", editedNews.date);

            await sendRequest(
                `http://localhost:8080/api/news/${newsItem.id}`,
                "PUT",
                formData,
                { "Content-Type": "multipart/form-data" }
            );

            OnHideModal();
            window.location.reload();
        } catch (error) {
            console.error("Помилка під час оновлення новини:", error);
        }
    };

    const openEditModal = () => {
        OnShowModal(
            <div>
                <h3>Редагування новини</h3>

                <label>Заголовок:</label>
                <input
                    type="text"
                    name="title"
                    value={editedNews.title || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Введіть заголовок новини"
                />

                <label>Опис:</label>
                <textarea
                    name="description"
                    value={editedNews.description || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Напишіть опис новини"
                />

                <label>Пріоритет:</label>
                <input
                    type="text"
                    name="priority"
                    value={editedNews.priority || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Введіть пріоритет новини" 
                />

                <label>Дата:</label>
                <input
                    type="date"
                    name="date"
                    value={editedNews.date || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Виберіть дату новини" 
                />

                <label className="mt-3">Завантажте нове фото новини:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewPhoto(e.target.files ? e.target.files[0] : null)}
                    className="form-control"
                />

                <button className="btn btn-primary mt-3" onClick={handleSave}>
                    Зберегти
                </button>
            </div>
        );
    };

    const isUserAuthenticated = sessionStorage.getItem("token") !== null;

    if (!isUserAuthenticated) {
        return null;
    }

    return (
        <button className="btn btn-warning position-fixed bottom-0 right-0 m-3" onClick={openEditModal}>
            <FaEdit />
        </button>
    );
};

export { NewsEditButton };
// TODO : решить проблему с вводом данных в поля ввода кнопок изминения(не работает)