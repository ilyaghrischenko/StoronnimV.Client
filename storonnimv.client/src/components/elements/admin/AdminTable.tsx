import {FC, useContext, useEffect} from "react";
import {Button, Container, Table} from "react-bootstrap";
import {Loading} from "../shared/Loading.tsx";
import {AdminContext} from "../../contexts/AdminContext.tsx";

const AdminTable: FC = () => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error("AdminContext must be used within a AdminContextProvider");
    }

    const {fetchData, getCurrentList, handleCategoryChange, loading, selectedCategory} = adminContext;

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
                    {loading ? <Loading/> : getCurrentList()}
                </tbody>
            </Table>
        </Container>
    );
};

export {AdminTable};