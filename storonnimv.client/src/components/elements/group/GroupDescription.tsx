import {FC, useContext, useEffect, useState} from "react";
import {IGroupPageFullInfo} from "../../../models/group/IGroupInfo";
import {Container} from "react-bootstrap";
import {Description} from "./groupPageComponents/Description";
import {ShortMembers} from "./groupPageComponents/ShortMembers";
import {GroupContext} from "../../contexts/GroupContext";

const GroupDescription: FC = () => {
    const newsContext = useContext(GroupContext);

    if (!newsContext) {
        throw new Error("GroupContext must be used within a GroupContextProvider");
    }

    const { fetchGroupInfo, fullInfo } = newsContext;

    useEffect(() => {
        fetchGroupInfo();
    }, []);

    return (
        <Container>
            <Description groupInfo={fullInfo.groupPage} />
            <ShortMembers members={fullInfo.members} />
        </Container>
    );
};

export {GroupDescription};