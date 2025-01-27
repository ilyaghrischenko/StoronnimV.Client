import {FC, useContext, useEffect} from "react";
import {HomeContext} from "../../contexts/HomeContext";
import {PageLoading} from "../shared/PageLoading";
import {Container, Image} from "react-bootstrap";

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
            <PageLoading/>
        );
    }

    return (
        <Container
            className={`schedule-home-container ${className}`}
            onClick={() => onClickHomeElementHandler('schedule')}>
                <Image className='schedule-home-container__image' src={homeSchedule.photo}/>
                <p className='schedule-home-container__title'>{homeSchedule.title}</p>

                <Container className='date-and-location-container'>
                    <p className='date-and-location-container__location'>{homeSchedule.location}</p>
                    <p className='date-and-location-container__date-time'>{homeSchedule.performanceDateTime}</p>
                </Container>
        </Container>
    );
};

export {ScheduleHomeContainer};