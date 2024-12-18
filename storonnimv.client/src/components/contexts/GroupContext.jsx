import React, {createContext, useContext} from "react";
import {GlobalContext} from "./Shared/GlobalContext";

const GroupContext = createContext();

const GroupContextProvider = ({ children }) => {
    const {sendRequest} = useContext(GlobalContext);

    const getGroupInfo = async () => {
        const data = await sendRequest("http://localhost:8080/api/group");
        return data.groupPage;
    };

    const getMembers = async () => {
        const data = await sendRequest("http://localhost:8080/api/group");
        return data.members;
    }

    const value = {
        getGroupInfo,
        getMembers,
    };
    
    return (
        <GroupContext.Provider value={value}>
            {children}
        </GroupContext.Provider>
    );
}

export {GroupContext, GroupContextProvider};