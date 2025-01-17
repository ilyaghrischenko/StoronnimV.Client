import {FC, useContext, useEffect} from "react";
import {HomeContext} from "../../contexts/HomeContext";
import {Loading} from "../shared/Loading";
import {Container, Image} from "react-bootstrap";

const ScheduleHomeContainer: FC = () => {
    const homeContext = useContext(HomeContext);

    if (!homeContext) {
        throw new Error("HomeContext must be used within a HomeContextProvider");
    }

    const {loading, homeSchedule, fetchHomeSchedule} = homeContext;

    useEffect(() => {
        fetchHomeSchedule();
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Container className='schedule-home-container'>
            <p>{homeSchedule.id}</p>
            <Image src={homeSchedule.photo} />
            <p>{homeSchedule.title}</p>
            <p>{homeSchedule.performanceDateTime}</p>
            <p>{homeSchedule.location}</p>
            <p>{homeSchedule.status}</p>
        </Container>
    );
};

export { ScheduleHomeContainer };