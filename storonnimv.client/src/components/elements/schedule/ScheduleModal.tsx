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
            <div className='schedule-modal__container'>
                <Image className="schedule-modal__photo" src={scheduleFullInfo.photo} />

                <div className="schedule-modal__info">
                    <h1 className="schedule-modal__info-title main-text">{scheduleFullInfo.title}</h1>
                    <h2 className="schedule-modal__info-datetime">{scheduleFullInfo.performanceDateTime}</h2>
                    <LocationMap address={scheduleFullInfo.location} />


                    {isAdmin && <ScheduleEditButton
                        item={scheduleFullInfo}
                    />}

                    {isAdmin && <ScheduleDeleteButton
                        item={scheduleFullInfo}
                    />}
                </div>
            </div>

            <div className='schedule-modal__description-container'>
                <p className="schedule-modal__description-container-description secondary-text">{scheduleFullInfo.description}</p>
            </div>
        </Container>
    );
};

export { ScheduleModal };
