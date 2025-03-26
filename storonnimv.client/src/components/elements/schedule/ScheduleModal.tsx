import { FC, useContext, useEffect } from "react";
import { ScheduleContext } from "../../contexts/ScheduleContext.tsx";
import { Col, Container, Row, Image } from "react-bootstrap";
import { ModalLoading } from "../shared/ModalLoading.tsx";
import { ScheduleEditButton } from "../admin/EditsButtons/SheduleEditButton.tsx";
import { ScheduleDeleteButton } from "../admin/DeleteButtons/ScheduleDeleteButton.tsx";

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
    }, [scheduleId]);

    if (loading) {
        return <ModalLoading />;
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

                    //TODO: если админ кнопки отображать
                    <ScheduleEditButton
                        apiUrl="/api/schedule" 
                        modalTitle="Редагувати розклад"
                        scheduleData={scheduleFullInfo} 
                    />
                    
                    <ScheduleDeleteButton
                        apiUrl="/api/schedule"
                        modalTitle="Афішу"
                        scheduleData={scheduleFullInfo}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export { ScheduleModal };
