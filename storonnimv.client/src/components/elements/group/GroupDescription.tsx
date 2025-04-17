import {FC, useContext, useEffect} from "react";
import {Container} from "react-bootstrap";
import {Description} from "./groupPageComponents/Description";
import {ShortMembers} from "./groupPageComponents/ShortMembers";
import {GroupContext} from "../../contexts/GroupContext";
import {PageLoading} from "../shared/PageLoading";
import {GroupInfoEditButton} from "../admin/EditsButtons/GroupInfoEditButton";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";

const GroupDescription: FC = () => {
    const groupContext = useContext(GroupContext)!;
    const globalContext = useContext(GlobalContext)!;

    const {pageLoading, isAdmin} = globalContext;
    const {fetchGroupInfo, fullInfo} = groupContext;

    useEffect(() => {
        fetchGroupInfo().then(r => console.log(r));
    }, []);

    if (pageLoading) {
        return (
            <PageLoading elementsCount={1} columns={1}/>
        );
    }

    return (
        <Container
            className='group-description-container'
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.8) 100%), url(${fullInfo.groupPage.photoUrl})`,
            }}
        >
            {isAdmin && <GroupInfoEditButton/>}
            <Description groupInfo={fullInfo.groupPage}/>
            <ShortMembers members={fullInfo.members}/>
        </Container>
    );
};

export {GroupDescription};
