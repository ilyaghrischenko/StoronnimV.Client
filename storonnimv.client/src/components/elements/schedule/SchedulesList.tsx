import {FC, useContext, useEffect} from "react";
import {ScheduleListItem} from "./ScheduleListItem";
import {ScheduleContext, ScheduleContextProvider} from "../../contexts/ScheduleContext";
import {PageLoading} from "../shared/PageLoading";
import {List} from "../shared/GenericList/List";
import {IScheduleListItem} from "../../../models/schedule/IScheduleListItem";
import {ListItem} from "../shared/GenericList/ListItem";
import {GlobalContext} from "../../contexts/shared/GlobalContext";
import {ScheduleModal} from "./ScheduleModal.tsx";
import {Button, Container} from "react-bootstrap";
import {PaginationSection} from "../shared/PaginationSection.tsx";
import {AddScheduleModalContent} from "./forms/AddScheduleModalContent.tsx";
import {FaPlus} from "react-icons/fa";

const SchedulesList: FC = () => {
    const scheduleContext = useContext(ScheduleContext)!;
    const globalContext = useContext(GlobalContext)!;

    const {OnShowModal, pageLoading, isAdmin} = globalContext;
    const {paginate, schedules, currentPage, totalPages} = scheduleContext;

    useEffect(() => {
        const savedPage = sessionStorage.getItem("schedulesCurrentPage");
        const page = savedPage ? Number(savedPage) : 1;

        paginate(page);
    }, []);

    if (pageLoading) {
        return <PageLoading elementsCount={1} columns={1}/>;
    }

    return (
        <Container>
            {isAdmin && (
                <Button
                    className="add-button"
                    onClick={() => OnShowModal(<AddScheduleModalContent/>)}>
                    <FaPlus/>
                </Button>
            )}
            <List
                className='schedules-list'
                items={schedules}
                renderItem={(schedule: IScheduleListItem) => (
                    <ListItem
                        className='schedules-list__item'
                        item={schedule}
                        key={schedule.id}
                        renderItem={(schedule: IScheduleListItem) => (
                            <ScheduleListItem key={schedule.id} schedule={schedule}/>
                        )}
                        onClick={() =>
                            OnShowModal(
                                <ScheduleContextProvider>
                                    <ScheduleModal scheduleId={schedule.id}/>
                                </ScheduleContextProvider>
                            )
                        }
                    />
                )}
            />

            <PaginationSection
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate} />
        </Container>
    );
};

export {SchedulesList};
