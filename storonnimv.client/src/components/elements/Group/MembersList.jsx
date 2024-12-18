import {ListGroup} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {GroupContext} from "../../contexts/GroupContext";
import {Member} from "./Member";

const MembersList = () => {
    const {getMembers} = useContext(GroupContext);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getMembers();
            setMembers(data);
        };

        fetchData();
    }, [getMembers]);

    return (
        <ListGroup className="members-list">
            <h1>Members:</h1>
            {
                members.length > 0 ? (
                    members.map((member) => (
                        <Member member={member} key={member.id} />
                    ))
                ) : (
                    <p>Учасників немає</p>
                )
            }
        </ListGroup>
    );
};

export {MembersList};