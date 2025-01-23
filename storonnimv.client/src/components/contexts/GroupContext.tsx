import React, {createContext, ReactNode, useContext, useState} from "react";
import {IGroupPageFullInfo} from "../../models/group/IGroupInfo";
import {GlobalContext} from "./shared/GlobalContext";
import {IMemberFullInfo} from "../../models/group/IMemberInfo.ts";

interface GroupContextType {
    fetchGroupInfo: () => Promise<void>;
    fullInfo: IGroupPageFullInfo;
    loading: boolean;
    memberFullInfo: IMemberFullInfo;
    fetchMemberInfo: (memberId: number) => Promise<void>;
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
            const data: IGroupPageFullInfo = await sendRequest("http://localhost:8080/api/group");

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

    const [memberFullInfo, setMemberFullInfo] = useState<IMemberFullInfo>({
        member: {
            id: 0,
            photoUrl: "",
            fullName: "",
            description: "",
            role: "",
        },
            socials: []
    });
    const fetchMemberInfo = async (memberId: number ): Promise<void> => {
        try {
            const data: IMemberFullInfo = await sendRequest(`http://localhost:8080/api/group/member/${memberId}`);

            if (!data) {
                console.error("No data received from the API");
                return;
            }
            console.dir(data);
            setMemberFullInfo(data);
        } catch (error) {
            console.error("Error fetching news:", error);
            return;
        }
    };

    const value: GroupContextType = {
        memberFullInfo,
        fetchMemberInfo,
        fetchGroupInfo,
        fullInfo,
        loading
    };

    return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
};

export { GroupContext, GroupContextProvider };
