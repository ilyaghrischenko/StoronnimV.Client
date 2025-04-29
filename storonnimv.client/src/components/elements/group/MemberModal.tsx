import {FC, useContext, useEffect} from "react";
import {GroupContext} from "../../contexts/GroupContext.tsx";
import {Col, Container, Row, Image, Button} from "react-bootstrap";
import {ModalLoading} from "../shared/ModalLoading.tsx";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {FaEdit, FaTrash} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {EditSocialModal} from "./forms/social/EditSocialModal.tsx";
import {DeleteSocialModal} from "./forms/social/DeleteSocialModal.tsx";
import {IoAddCircleSharp} from "react-icons/io5";
import {AddSocialModal} from "./forms/social/AddSocialModal.tsx";
import {DeleteMemberModal} from "./forms/member/DeleteMemberModal.tsx";
import {EditMemberModal} from "./forms/member/EditMemberModal.tsx";

interface MemberModalProps {
    memberId: number;
}

const MemberModal: FC<MemberModalProps> = ({memberId}) => {
    const globalContext = useContext(GlobalContext)!;
    const groupContext = useContext(GroupContext)!;

    const {isAdmin, OnShowModal, modalLoading} = globalContext;
    const {fetchMemberInfo, memberFullInfo} = groupContext;



    useEffect(() => {
        fetchMemberInfo(memberId);
    }, [memberId]);

    if (modalLoading) {
        return <ModalLoading/>;
    }

    return (
        <Container className="member-modal">
            <Row className="mb-3">
                <Col xs={12} className="text-center">
                    <Image className="member-modal__photo" src={memberFullInfo.photoUrl}/>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={12} className="member-modal__info">
                    <h1 className="member-modal__info-title">{memberFullInfo.fullName}</h1>
                    <h2 className="member-modal__info-role">{memberFullInfo.role}</h2>
                    <p className="member-modal__info-description">{memberFullInfo.description}</p>
                </Col>
            </Row>

            <Row className="mb-3 d-flex justify-content-between">
                <Col xs="auto">
                    {isAdmin && <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();

                        OnShowModal(<EditMemberModal item={memberFullInfo}/>)
                    }}>
                        <FaEdit/>
                    </Button>}
                </Col>
                <Col xs="auto">
                    {isAdmin && <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.preventDefault();

                        OnShowModal(<DeleteMemberModal item={memberFullInfo}/>)
                    }}>
                        <FaTrash/>
                    </Button>}
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={12} className="member-modal__social-networks">
                    {isAdmin &&
                        <Button
                            variant="primary"
                            onClick={() => OnShowModal(<AddSocialModal memberId={memberId}/>)}
                        >
                            <IoAddCircleSharp/>
                        </Button>}

                    {memberFullInfo.socials.map((socialNetwork) => (
                        <div key={socialNetwork.id} className="member-modal__social-networks__item">
                            <p className="member-modal__social-networks__item-name">
                                {socialNetwork.socialNetwork}
                            </p>
                            <a
                                className="member-modal__social-networks__item-link"
                                href={socialNetwork.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {socialNetwork.url}
                            </a>

                            {isAdmin &&
                                <Button
                                    variant="primary"
                                    onClick={() => OnShowModal(<EditSocialModal item={socialNetwork}/>)}
                                >
                                    <FaEdit/>
                                </Button>}

                            {isAdmin &&
                                <Button
                                    variant="primary"
                                    onClick={() => OnShowModal(<DeleteSocialModal itemId={socialNetwork.id}/>)}
                                >
                                    <MdDeleteForever/>
                                </Button>}
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export {MemberModal};
