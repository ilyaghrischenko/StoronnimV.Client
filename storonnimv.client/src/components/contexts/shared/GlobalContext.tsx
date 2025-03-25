import { createContext, useState, ReactNode, FC } from "react";
import axios, { AxiosResponse } from "axios";

// Определяем интерфейс для значения контекста
interface GlobalContextType {
    sendRequest: (
        apiUrl: string,
        method?: string,
        body?: any,
        headers?: Record<string, string>
    ) => Promise<AxiosResponse>;
    loading: boolean;
    showModal: boolean;
    OnShowModal: (mContent: ReactNode, mTitle?: string) => void; 
    OnHideModal: () => void;
    modalContent: ReactNode;
    modalTitle: string;
    isAdminRoute: () => boolean;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
}

// Создаем контекст с типизацией
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalContextProviderProps {
    children: ReactNode;
}

const GlobalContextProvider: FC<GlobalContextProviderProps> = ({ children }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);
    const [modalTitle, setModalTitle] = useState<string>("");

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const OnShowModal = (mContent: ReactNode, mTitle: string = "") => {
        setModalTitle(mTitle);
        setModalContent(mContent);
        setShowModal(true);
    };

    const OnHideModal = () => {
        setModalContent(null);
        setShowModal(false);
    };

    // Асинхронная функция для отправки запросов
    async function sendRequest(
        apiUrl: string,
        method: string = "GET",
        body: any = null,
        headers: Record<string, string> = {}
    ): Promise<AxiosResponse> {
        try {
            const config = {
                method,
                url: apiUrl,
                headers,
                data: body,
                withCredentials: true
            };

            // TODO: СДЕЛАТЬ ЧТО-ТО С АНИМАЦИЕЙ ЗАГРУЗКИ
            setLoading(true);
            const response = await axios(config);
            setLoading(false);

            return response;
        } catch (error: any) {
            setLoading(false);
            if (error.response) {
                // Если сервер вернул статус ошибки, но ответ доступен
                return error.response;
            } else {
                // Если ошибка сети или другая проблема
                throw new Error(error.message || "Network error");
            }
        }
    }

    const [loading, setLoading] = useState<boolean>(false);

    const isAdminRoute = (): boolean => {
        return window.location.pathname.startsWith("/admin");
    };

    // Значение контекста
    const value: GlobalContextType = {
        modalTitle,
        modalContent,
        showModal,
        OnShowModal,
        OnHideModal,
        sendRequest,
        loading,
        isAdminRoute,
        isAdmin,
        setIsAdmin
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContextProvider, GlobalContext };
