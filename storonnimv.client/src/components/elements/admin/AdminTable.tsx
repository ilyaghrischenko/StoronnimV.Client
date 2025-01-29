import {FC, useContext, useEffect} from "react";
import {Button, Container, Pagination, Table} from "react-bootstrap";
import {ModalLoading} from "../shared/ModalLoading.tsx";
import {AdminContext} from "../../contexts/AdminContext.tsx";

const AdminTable: FC = () => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const {fetchData, getCurrentList, handleCategoryChange, loading,
        selectedCategory, currentPage, totalPages, paginate} = adminContext;

    const adminNewsListProperties: string[] = [
        'id', 'photo?', 'video?', 'title', 'description', 'priority', 'date'
    ];
    const adminSchedulesListProperties: string[] = [
        'id', 'photo', 'title', 'performanceDateTime', 'location', 'status'
    ];
    const adminMusicListProperties: string[] = [
        'id', 'bgImageUrl', 'platformUrl'
    ];
    const adminGroupInfoProperties: string[] = [
        'id', 'photoUrl', 'description'
    ];
    const adminMembersListProperties: string[] = [
        'id', 'photoUrl', 'fullName', 'role'
    ];
    const adminVideosListProperties: string[] = [
        'id', 'title', 'url'
    ];

    useEffect(() => {
        fetchData(selectedCategory);
    }, [selectedCategory]);

    return (
        <Container className='admin-container'>
            <Container className='admin-buttons-container'>
                {["News", "Schedules", "Music", "Group info", "Members", "Videos"].map((category) => (
                    <Button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </Button>
                ))}
                <Button
                    onClick={() => console.log("Добавить новую запись")}
                >
                    +
                </Button>
            </Container>

            <Table className='admin-table'>
                <thead>
                    <tr>
                        {selectedCategory === "News" &&
                            adminNewsListProperties.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        {selectedCategory === "Schedules" &&
                            adminSchedulesListProperties.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        {selectedCategory === "Music" &&
                            adminMusicListProperties.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        {selectedCategory === "Group info" &&
                            adminGroupInfoProperties.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        {selectedCategory === "Members" &&
                            adminMembersListProperties.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        {selectedCategory === "Videos" &&
                            adminVideosListProperties.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? <ModalLoading/> : getCurrentList()}
                </tbody>
            </Table>

            {(selectedCategory === 'News' || selectedCategory === 'Videos') &&
                <Container>
                    <Pagination className="news-list__pagination">
                        {/* Кнопка "Предыдущая страница" */}
                        <Pagination.Prev
                            onClick={() => paginate(selectedCategory, currentPage - 1)}
                            disabled={currentPage === 1}
                        />

                        {/* Кнопки с номерами страниц */}
                        {[...Array(totalPages)].map((_, index) => (
                            <Pagination.Item
                                key={index}
                                onClick={() => paginate(selectedCategory, index + 1)}
                                active={currentPage === index + 1}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}

                        {/* Кнопка "Следующая страница" */}
                        <Pagination.Next
                            onClick={() => paginate(selectedCategory, currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>
                </Container>}
        </Container>
    );
};

export {AdminTable};