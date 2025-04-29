import {FC, useContext, useEffect} from "react";
import {GroupContext} from "../../contexts/GroupContext.tsx";
import {Image, Button} from "react-bootstrap";
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
        <div className="member-modal">
            <div className='member-modal__up-container'>
                <div className='member-modal__photo-container'>
                    <Image className="member-modal__photo" src={memberFullInfo.photoUrl}/>
                </div>

                <div className="member-modal__info">
                    <h1 className="member-modal__info-title main-text">{memberFullInfo.fullName}</h1>
                    <h2 className="member-modal__info-role secondary-text">{memberFullInfo.role}</h2>

                    {isAdmin &&
                        <>
                            <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();

                                OnShowModal(<EditMemberModal item={memberFullInfo}/>)
                            }}>
                                <FaEdit/>
                            </Button>

                            <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();

                                OnShowModal(<DeleteMemberModal item={memberFullInfo}/>)
                            }}>
                                <FaTrash/>
                            </Button>
                        </>}
                </div>
            </div>

            <div className='member-modal__down-container'>
                <p className="member-modal__description secondary-text">{memberFullInfo.description}</p>

                <div className="member-modal__social-networks">
                    {isAdmin &&
                        <Button
                            variant="primary"
                            onClick={() => OnShowModal(<AddSocialModal memberId={memberId}/>)}
                        >
                            <IoAddCircleSharp/>
                        </Button>}

                    {memberFullInfo.socials.map((socialNetwork) => (
                        <div key={socialNetwork.id} className="member-modal__social-networks__item">
                            <p className="member-modal__social-networks__item-name secondary-text">
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
                </div>
            </div>
        </div>
    );
};

export {MemberModal};
