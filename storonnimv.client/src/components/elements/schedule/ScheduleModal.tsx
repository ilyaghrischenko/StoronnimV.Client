import { FC, useContext, useEffect } from "react";
import { ScheduleContext } from "../../contexts/ScheduleContext.tsx";
import { Container, Image } from "react-bootstrap";
import { ModalLoading } from "../shared/ModalLoading.tsx";
import { ScheduleEditButton } from "../admin/EditsButtons/SheduleEditButton.tsx";
import { ScheduleDeleteButton } from "../admin/DeleteButtons/ScheduleDeleteButton.tsx";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {LocationMap} from "./LocationMap.tsx";

interface ScheduleModalProps {
    scheduleId: number;
}

const ScheduleModal: FC<ScheduleModalProps> = ({ scheduleId }) => {
    const globalContext = useContext(GlobalContext)!;
    const scheduleContext = useContext(ScheduleContext)!;

    const { isAdmin, modalLoading} = globalContext;
    const { fetchScheduleFullInfo, scheduleFullInfo} = scheduleContext;

    useEffect(() => {
        fetchScheduleFullInfo(scheduleId);
    }, [scheduleId]);

    if (modalLoading) {
        return <ModalLoading />;
    }

    return (
        <Container className="schedule-modal">
            <Image className="schedule-modal__photo" src={scheduleFullInfo.photo} />

            <div className="schedule-modal__info">
                <h1 className="schedule-modal__info-title">{scheduleFullInfo.title}</h1>
                <h2 className="schedule-modal__info-datetime">{scheduleFullInfo.performanceDateTime}</h2>
                <LocationMap address={scheduleFullInfo.location} />
                <p className="schedule-modal__info-description">{scheduleFullInfo.description}</p>

                {isAdmin && <ScheduleEditButton
                    item={scheduleFullInfo}
                />}

                {isAdmin && <ScheduleDeleteButton
                    item={scheduleFullInfo}
                />}
            </div>
        </Container>
    );
};

export { ScheduleModal };
