import {FC, useContext, useEffect, useState} from "react";
import {IGroupPageFullInfo} from "../../../models/group/IGroupInfo";
import {Container} from "react-bootstrap";
import {Description} from "./groupPageComponents/Description";
import {ShortMembers} from "./groupPageComponents/ShortMembers";
import {GroupContext} from "../../contexts/GroupContext";
import {Loading} from "../shared/Loading";

const GroupDescription: FC = () => {
    const groupContext = useContext(GroupContext);

    if (!groupContext) {
        throw new Error("GroupContext must be used within a GroupContextProvider");
    }

    const { fetchGroupInfo, fullInfo, loading } = groupContext;

    useEffect(() => {
        fetchGroupInfo();
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Container>
            <Description groupInfo={fullInfo.groupPage} />
            <ShortMembers members={fullInfo.members} />
        </Container>
    );
};

export {GroupDescription};