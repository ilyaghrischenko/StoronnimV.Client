import {FC, useContext, useEffect} from "react";
import {ScheduleListItem} from "./ScheduleListItem";
import {ScheduleContext, ScheduleContextProvider} from "../../contexts/ScheduleContext";
import {List} from "../shared/GenericList/List";
import {IScheduleListItem} from "../../../models/schedule/IScheduleListItem";
import {ListItem} from "../shared/GenericList/ListItem";
import {GlobalContext} from "../../contexts/shared/GlobalContext";
import {ScheduleModal} from "./ScheduleModal.tsx";
import {Button} from "react-bootstrap";
import {PaginationSection} from "../shared/PaginationSection.tsx";
import {AddScheduleModal} from "./forms/AddScheduleModal.tsx";
import {FaPlus} from "react-icons/fa";
import PreloaderTile from "../shared/PreloaderTile.tsx";

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

    return (
        <div className='schedules-list'>
            <div className='schedules-list-container'>
                {isAdmin && (
                    <Button
                        className="admin-button admin-button__add"
                        onClick={() => OnShowModal(<AddScheduleModal/>)}>
                        <FaPlus/>
                    </Button>
                )}

                {!pageLoading ?
                    <List
                        className='schedules-list__grid'
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
                    :
                    <List
                        className="schedules-list__grid"
                        items={Array(3).fill(null)}
                        renderItem={(item: typeof PreloaderTile) => (
                            <ListItem
                                className='schedules-list__item'
                                item={item}
                                renderItem={() => <PreloaderTile className='preloader-tile__container-schedule-page'/>}
                            />
                        )}
                    />
                }
            </div>

            <PaginationSection
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}/>
        </div>
    );
};

export {SchedulesList};
