import React, {createContext, ReactNode, useContext, useState} from "react";
import {GlobalContext} from "./shared/GlobalContext";
import {IScheduleListItem} from "../../models/schedule/IScheduleListItem";
import {ISchedule} from "../../models/schedule/ISchedule.ts";

// Тип контекста
interface ScheduleContextType {
    schedules: IScheduleListItem[];
    loading: boolean;
    fetchSchedules: () => Promise<void>;
    scheduleFullInfo: ISchedule;
    fetchScheduleFullInfo: (scheduleId: number) => Promise<void>;
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
    const [scheduleFullInfo, setScheduleFullInfo] = useState<ISchedule>({} as ISchedule);

    const fetchScheduleFullInfo = async (scheduleId: number): Promise<void> => {
        try {
            const response = await sendRequest(`http://localhost:8080/api/schedules/${scheduleId}`);

            const data: ISchedule = response.data;

            setScheduleFullInfo(data);
        } catch (error) {
            console.error("Error fetching schedule full info:", error);
            return;
        }
    };

    const fetchSchedules = async (): Promise<void> => {
        try {
            const response = await sendRequest("http://localhost:8080/api/schedules");

            const data: IScheduleListItem[] = response.data;

            setSchedules(data);
        } catch (error) {
            console.error("Error fetching schedules:", error);
            return;
        }
    };

    const value: ScheduleContextType = {
        fetchScheduleFullInfo,
        scheduleFullInfo,
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
