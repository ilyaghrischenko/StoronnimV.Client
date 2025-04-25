import {FC, useContext, useEffect} from "react";
import {HomeContext} from "../../contexts/HomeContext";
import {Container, Image} from "react-bootstrap";

interface ScheduleHomeContainerProps {
    className?: string;
}

const ScheduleHomeContainer: FC<ScheduleHomeContainerProps> = ({className}) => {
    const homeContext = useContext(HomeContext)!;

    const {homeSchedule, fetchHomeSchedule, onClickHomeElementHandler} = homeContext;

    useEffect(() => {
        fetchHomeSchedule();
    }, []);

    return (
        <Container
            className={`schedule-home-container ${className}`}
            onClick={() => onClickHomeElementHandler('schedule')}>
                <Image className='schedule-home-container__image' src={homeSchedule.photo}/>
        </Container>
    );
};

export {ScheduleHomeContainer};