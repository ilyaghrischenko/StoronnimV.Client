import { FC, useContext } from "react";
import { Modal } from "react-bootstrap";
import { GlobalContext } from "../../contexts/shared/GlobalContext";
import "../../../styles/elements/shared/ModalWindow.css"; // Подключение CSS

const ModalWindow: FC = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { showModal, OnHideModal, modalContent, modalTitle } = context;

    return (
        <Modal
            show={showModal}
            onHide={OnHideModal}
            centered
            dialogClassName="custom-modal" // Кастомный класс
        >
            <Modal.Header>
                {/* Заголовок по центру */}
                {modalTitle && <Modal.Title className="modal-title">{modalTitle}</Modal.Title>}
                {/* Кнопка закрытия с кастомным стилем */}
                <button className="close" onClick={OnHideModal}>

                </button>
            </Modal.Header>

            <Modal.Body>{modalContent}</Modal.Body>

            <Modal.Footer>
                {/* Здесь можно добавить кнопки для модального окна, если нужно */}
            </Modal.Footer>
        </Modal>
    );
};

export { ModalWindow };
