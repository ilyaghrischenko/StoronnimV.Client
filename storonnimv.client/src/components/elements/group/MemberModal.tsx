import { FC, useContext, useEffect } from "react";
import { GroupContext } from "../../contexts/GroupContext.tsx";
import {Col, Container, Row, Image, Button} from "react-bootstrap";
import { ModalLoading } from "../shared/ModalLoading.tsx";
import { GroupMemberEditButton } from "../admin/EditsButtons/GroupMemberEditButton.tsx";
import { GroupMemberDeleteButton } from "../admin/DeleteButtons/GroupMemberDeleteButton.tsx";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {FaEdit} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";
import {SocialEditModal} from "./forms/SocialEditModal.tsx";
import {SocialDeleteModal} from "./forms/SocialDeleteModal.tsx";
import {IoAddCircleSharp} from "react-icons/io5";
import {SocialAddModal} from "./forms/SocialAddModal.tsx";

interface MemberModalProps {
    memberId: number;
}

const MemberModal: FC<MemberModalProps> = ({ memberId }) => {
    const groupContext = useContext(GroupContext);

    if (!groupContext) {
        throw new Error("GroupContext must be used within a GroupContextProvider");
    }

    const { fetchMemberInfo, memberFullInfo, loading } = groupContext;

    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { isAdmin, OnShowModal } = globalContext;

    useEffect(() => {
        fetchMemberInfo(memberId);
    }, [memberId]);

    if (loading) {
        return <ModalLoading />;
    }

    return (
        <Container className="member-modal">
            <Row className="mb-3">
                <Col xs={12} className="text-center">
                    <Image className="member-modal__photo" src={memberFullInfo.photoUrl} />
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
                    {isAdmin && <GroupMemberEditButton item={memberFullInfo} />}
                </Col>
                <Col xs="auto">
                    {isAdmin && <GroupMemberDeleteButton item={memberFullInfo} />}
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={12} className="member-modal__social-networks">
                    {isAdmin &&
                    <Button
                        variant="primary"
                        onClick={() => OnShowModal(<SocialAddModal memberId={memberId} />)}
                    >
                        <IoAddCircleSharp />
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
                                onClick={() => OnShowModal(<SocialEditModal item={socialNetwork} />)}
                            >
                                <FaEdit />
                            </Button>}

                            {isAdmin &&
                            <Button
                                variant="primary"
                                onClick={() => OnShowModal(<SocialDeleteModal itemId={socialNetwork.id} />)}
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

export { MemberModal };
