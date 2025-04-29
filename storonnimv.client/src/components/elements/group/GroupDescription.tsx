import {FC, useContext, useEffect} from "react";
import {Button, Container} from "react-bootstrap";
import {Description} from "./groupPageComponents/Description";
import {ShortMembers} from "./groupPageComponents/ShortMembers";
import {GroupContext} from "../../contexts/GroupContext";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import PreloaderTile from "../shared/PreloaderTile.tsx";
import {FaEdit} from "react-icons/fa";
import {EditGroupModal} from "./forms/group/EditGroupModal.tsx";

const GroupDescription: FC = () => {
    const groupContext = useContext(GroupContext)!;
    const globalContext = useContext(GlobalContext)!;

    const {pageLoading, isAdmin, OnShowModal} = globalContext;
    const {fetchGroupInfo, fullInfo} = groupContext;

    useEffect(() => {
        fetchGroupInfo();
    }, []);

    return (
        <>
            {!
                pageLoading ?
                <Container
                    className='group-description-container'
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.8) 100%), url(${fullInfo.groupPage.photoUrl})`,
                    }}
                >
                    {isAdmin && <Button
                        className="admin-button admin-button__edit"
                        onClick={() => OnShowModal(<EditGroupModal fullInfo={fullInfo}/>)}
                    >
                        <FaEdit/>
                    </Button>}
                    <Description groupInfo={fullInfo.groupPage}/>
                    <ShortMembers members={fullInfo.members}/>
                </Container>
                :
                <Container className='group-description-container'>
                        <PreloaderTile className='preloader-tile__container-group-page'/>
                </Container>
            }
        </>
    );
};

export {GroupDescription};
