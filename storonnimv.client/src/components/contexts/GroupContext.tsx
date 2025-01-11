import React, { createContext, useContext, ReactNode } from "react";
import {IGroupPageFullInfo} from "../../models/group/IGroupInfo";
import { GlobalContext } from "./shared/GlobalContext";

interface GroupContextType {
    getGroupPageFullInfo: () => Promise<IGroupPageFullInfo | undefined>;
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

    const getGroupPageFullInfo = async (): Promise<IGroupPageFullInfo | undefined> => {
        try {
            const data = await sendRequest("http://localhost:8080/api/group");

            if (!data) {
                console.error("No data received from the API");
                return undefined;
            }

            const groupPageFullInfo: IGroupPageFullInfo = {
                groupPage: data.groupPage,
                members: data.members,
            };

            return groupPageFullInfo;
        } catch (error) {
            console.error("Error fetching group page full info:", error);
            return undefined;
        }
    };

    const value: GroupContextType = {
        getGroupPageFullInfo,
        loading
    };

    return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};

export { GroupContext, GroupContextProvider };
