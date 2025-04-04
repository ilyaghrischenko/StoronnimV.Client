import { FC, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Description } from "./groupPageComponents/Description";
import { ShortMembers } from "./groupPageComponents/ShortMembers";
import { GroupContext } from "../../contexts/GroupContext";
import { PageLoading } from "../shared/PageLoading";
import { GroupInfoEditButton } from "../admin/EditsButtons/GroupInfoEditButton";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";

const GroupDescription: FC = () => {
    const groupContext = useContext(GroupContext);

    if (!groupContext) {
        throw new Error("GroupContext must be used within a GroupContextProvider");
    }

    const { fetchGroupInfo, fullInfo, loading } = groupContext;

    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { isAdmin } = globalContext;

    useEffect(() => {
        fetchGroupInfo().then(r => console.log(r));
    }, []);

    if (loading) {
        return (
            <PageLoading elementsCount={1} columns={1} />
        );
    }

    return (
        <Container>
            {isAdmin && <GroupInfoEditButton />}
            <Description groupInfo={fullInfo.groupPage} />
            <ShortMembers members={fullInfo.members} />
        </Container>
    );
};

export { GroupDescription };
