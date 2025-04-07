import { IMemberShort } from "../../../../models/group/IGroupInfo";
import { FC, useContext } from "react";
import { ShortMemberItem } from "./ShortMemberItem";
import { List } from "../../shared/GenericList/List";
import { ListItem } from "../../shared/GenericList/ListItem";
import { GlobalContext } from "../../../contexts/shared/GlobalContext";
import { MemberModal } from "../MemberModal.tsx";
import { GroupContextProvider } from "../../../contexts/GroupContext.tsx";
import {AddMemberModal} from "../forms/AddMemberModal.tsx";
import {Button} from "react-bootstrap";
import {FaPlus} from "react-icons/fa";

interface IShortMembersProps {
    members: IMemberShort[];
}

const ShortMembers: FC<IShortMembersProps> = ({ members }) => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { OnShowModal, isAdmin } = context;

    return (
        <div>
            {isAdmin && <Button onClick={() => OnShowModal(<AddMemberModal />)}>
                <FaPlus/>
            </Button>
            }
            
            <List
                className="short-members-list"
                items={members}
                renderItem={(member: IMemberShort) => (
                    <ListItem
                        key={member.id}
                        className="short-members-list__item"
                        onClick={() => OnShowModal(
                            <GroupContextProvider>
                                <MemberModal memberId={member.id} />
                            </GroupContextProvider>
                        )}
                        item={member}
                        renderItem={(member: IMemberShort) => <ShortMemberItem key={member.id} member={member} />}
                    />
                )}
            />
        </div>
    );
};

export { ShortMembers };
