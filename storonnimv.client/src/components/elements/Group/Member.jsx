import {ListGroupItem} from "react-bootstrap";

const Member = ({member}) => {
    return (
        <ListGroupItem>
            <p>Full name: {member.fullName}</p>
            <p>Role: {member.role}</p>
            <br/>
        </ListGroupItem>
    );
};

export {Member};