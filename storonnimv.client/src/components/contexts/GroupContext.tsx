import React, {createContext, ReactNode, useContext, useState} from "react";
import {IGroupPageFullInfo} from "../../models/group/IGroupInfo";
import {GlobalContext} from "./shared/GlobalContext";

interface GroupContextType {
    fetchGroupInfo: () => Promise<void>;
    fullInfo: IGroupPageFullInfo;
    loading: boolean;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

interface GroupContextProviderProps {
    children: ReactNode;
}

const GroupContextProvider: React.FC<GroupContextProviderProps> = ({ children }) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;

    const [fullInfo, setFullInfo] = useState<IGroupPageFullInfo>({
        groupPage: {
            id: 0,
            photoUrl: "",
            description: ""
        },
        members: []
    });

    const fetchGroupInfo = async (): Promise<void> => {
        try {
            const response = await sendRequest("http://localhost:8080/api/group");

            const data: IGroupPageFullInfo = response.data;

            if (!data) {
                console.error("No data received from the API");
                return;
            }

            setFullInfo(data);
        } catch (error) {
            console.error("Error fetching news:", error);
            return;
        }
    };

    const value: GroupContextType = {
        fetchGroupInfo,
        fullInfo,
        loading
    };

    return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};

export { GroupContext, GroupContextProvider };
