import React, {createContext, ReactNode, useContext, useState} from "react";
import {GlobalContext} from "./shared/GlobalContext";
import {IScheduleListItem} from "../../models/schedule/IScheduleListItem";

// Тип контекста
interface ScheduleContextType {
    schedules: IScheduleListItem[];
    loading: boolean;
    fetchSchedules: () => Promise<void>;
}

// Создаем контекст с типизацией
const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

interface ScheduleContextProviderProps {
    children: ReactNode;
}

const ScheduleContextProvider: React.FC<ScheduleContextProviderProps> = ({ children }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;

    const [schedules, setSchedules] = useState<IScheduleListItem[]>([]);

    const fetchSchedules = async (): Promise<void> => {
        try {
            const data: IScheduleListItem[] = await sendRequest("http://localhost:8080/api/schedules");
            setSchedules(data);
        } catch (error) {
            console.error("Error fetching schedules:", error);
            return;
        }
    };

    const value: ScheduleContextType = {
        schedules,
        fetchSchedules,
        loading
    };

    return (
        <ScheduleContext.Provider value={value}>
            {children}
        </ScheduleContext.Provider>
    );
};

export { ScheduleContextProvider, ScheduleContext };
