import { FC, useContext, useEffect } from "react";
import { ScheduleContext } from "../../contexts/ScheduleContext.tsx";
import { Col, Container, Row, Image } from "react-bootstrap";
import { Loading } from "../shared/Loading.tsx";

interface ScheduleModalProps {
    scheduleId: number;
}

const ScheduleModal: FC<ScheduleModalProps> = ({ scheduleId }) => {
    const scheduleContext = useContext(ScheduleContext);

    if (!scheduleContext) {
        throw new Error("ScheduleContext is not defined");
    }

    const { fetchScheduleFullInfo, scheduleFullInfo, loading } = scheduleContext;

    useEffect(() => {
        fetchScheduleFullInfo(scheduleId);
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <Container className="schedule-modal">
            <Row className="mb-3">
                <Col xs={12} className="text-center">
                    <Image className="schedule-modal__photo" src={scheduleFullInfo.photo} />
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={12} className="schedule-modal__info">
                    <h1 className="schedule-modal__info-title">{scheduleFullInfo.title}</h1>
                    <h2 className="schedule-modal__info-datetime">{scheduleFullInfo.performanceDateTime}</h2>
                    <h3 className="schedule-modal__info-location">{scheduleFullInfo.location}</h3>
                    <p className="schedule-modal__info-description">{scheduleFullInfo.description}</p>
                </Col>
            </Row>
        </Container>
    );
};

export { ScheduleModal };
