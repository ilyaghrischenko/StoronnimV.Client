import {FC, useContext, useEffect} from "react";
import {HomeContext} from "../../contexts/HomeContext";
import {Loading} from "../shared/Loading";
import {Container, Image} from "react-bootstrap";

import '../../../styles/elements/home/ScheduleHomeContainer.css';

interface ScheduleHomeContainerProps {
    className?: string;
}

const ScheduleHomeContainer: FC<ScheduleHomeContainerProps> = ({className}) => {
    const homeContext = useContext(HomeContext);

    if (!homeContext) {
        throw new Error("HomeContext must be used within a HomeContextProvider");
    }

    const {loading, homeSchedule, fetchHomeSchedule, onClickHomeElementHandler} = homeContext;

    useEffect(() => {
        fetchHomeSchedule();
    }, []);

    if (loading) {
        return (
            <Loading/>
        );
    }

    return (
        <Container
            className={`schedule-home-container ${className}`}
            onClick={() => onClickHomeElementHandler('schedule')}>
            <Image className='schedule-home-container-item-photo' src={homeSchedule.photo}/>
            <p className='schedule-home-container-item-title'>{homeSchedule.title}</p>

            <Container className='date-and-location-container'>
                <p className='schedule-home-container-item-location'>{homeSchedule.location}</p>
                <p className='schedule-home-container-item-date-time'>{homeSchedule.performanceDateTime}</p>
            </Container>
        </Container>
    );
};

export {ScheduleHomeContainer};