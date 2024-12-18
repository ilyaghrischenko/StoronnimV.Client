import {Container} from "react-bootstrap";
import {useContext, useState, useEffect} from "react";
import {GroupContext} from "../../contexts/GroupContext";

const About = () => {
    const {getGroupInfo} = useContext(GroupContext);
    const [groupInfo, setGroupInfo] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getGroupInfo();
            setGroupInfo(data.description);
        };

        fetchData();
    }, [getGroupInfo]);

    return (
        <Container>
            <h1>Description: {groupInfo}</h1>
        </Container>
    );
};

export {About};