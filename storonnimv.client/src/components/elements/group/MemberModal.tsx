import { FC, useContext, useEffect } from "react";
import { GroupContext } from "../../contexts/GroupContext.tsx";
import { Col, Container, Row, Image } from "react-bootstrap";
import { ModalLoading } from "../shared/ModalLoading.tsx";
import { GroupMemberEditButton } from "../admin/EditsButtons/GroupMemberEditButton.tsx";
import { GroupMemberDeleteButton } from "../admin/DeleteButtons/GroupMemberDeleteButton.tsx";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";

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

    const { isAdmin } = globalContext;

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
                    <Image className="member-modal__photo" src={memberFullInfo.member.photoUrl} />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={12} className="member-modal__info">
                    <h1 className="member-modal__info-title">{memberFullInfo.member.fullName}</h1>
                    <h2 className="member-modal__info-role">{memberFullInfo.member.role}</h2>
                    <p className="member-modal__info-description">{memberFullInfo.member.description}</p>
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
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export { MemberModal };
