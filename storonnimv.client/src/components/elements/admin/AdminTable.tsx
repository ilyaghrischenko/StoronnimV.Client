import {FC, ReactNode, useContext, useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {Loading} from "../shared/Loading.tsx";
import {IAdminNewsItem} from "../../../models/admin/IAdminNewsItem.ts";
import {IAdminScheduleItem} from "../../../models/admin/IAdminScheduleItem.ts";
import {IAdminMusicItem} from "../../../models/admin/IAdminMusicItem.ts";
import {IAdminVideoItem} from "../../../models/admin/IAdminVideoItem.ts";
import {AxiosResponse} from "axios";
import {IGroupInfo, IGroupPageFullInfo, IMember} from "../../../models/group/IGroupInfo.ts";
import {AdminNewsList} from "./TableItems/AdminNewsList.tsx";
import {AdminSchedulesList} from "./TableItems/AdminSchedulesList.tsx";
import {AdminMemberListItem} from "./TableItems/AdminMemberListItem.tsx";
import {AdminMusicList} from "./TableItems/AdminMusicList.tsx";
import {AdminMembersList} from "./TableItems/AdminMembersList.tsx";
import {AdminVideoList} from "./TableItems/AdminVideoList.tsx";
import {AdminGroupInfo} from "./TableItems/AdminGroupInfo.tsx";

const AdminTable: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {sendRequest, loading} = globalContext;

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

    //TODO: DODELAT!!!!!!!

    const [adminNewsList, setAdminNewsList] = useState<IAdminNewsItem[]>([]);
    const [adminSchedulesList, setAdminSchedulesList] = useState<IAdminScheduleItem[]>([]);
    const [adminMusicList, setAdminMusicList] = useState<IAdminMusicItem[]>([]);
    const [adminGroupInfo, setAdminGroupInfo] = useState<IGroupInfo>({} as IGroupInfo);
    const [adminMembersList, setAdminMembersList] = useState<IMember[]>([]);
    const [adminVideosList, setAdminVideosList] = useState<IAdminVideoItem[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<string>('Music');

    const getCurrentList = (): ReactNode => {
        if (selectedCategory === 'News') {
            return <AdminNewsList items={adminNewsList} />;
        }
        else if (selectedCategory === 'Schedules') {
            return <AdminSchedulesList items={adminSchedulesList} />;
        }
        else if (selectedCategory === 'Music') {
            return <AdminMusicList items={adminMusicList} />;
        }
        else if (selectedCategory === 'Group info') {
            return <AdminGroupInfo item={adminGroupInfo} />;
        }
        else if (selectedCategory === 'Members') {
            return <AdminMembersList items={adminMembersList} />;
        }
        else if (selectedCategory === 'Videos') {
            return <AdminVideoList items={adminVideosList} />;
        }
    };

    const fetchData = async (category: string) => {
        try {
            let response: AxiosResponse = {} as AxiosResponse;

            if (category === 'News') {
                response = await sendRequest(`http://localhost:8080/api/news`);
                const data: IAdminNewsItem[] = response.data;
                setAdminNewsList(data);
            }
            else if (category === 'Schedules') {
                response = await sendRequest(`http://localhost:8080/api/schedules`);
                const data: IAdminScheduleItem[] = response.data;
                setAdminSchedulesList(data);
            }
            else if (category === 'Music') {
                response = await sendRequest(`http://localhost:8080/api/music`);
                const data: IAdminMusicItem[] = response.data;
                setAdminMusicList(data);
            }
            else if (category === 'Group info') {
                response = await sendRequest(`http://localhost:8080/api/group`);
                const fullData: IGroupPageFullInfo = response.data;
                const data: IGroupInfo = fullData.groupPage;
                setAdminGroupInfo(data);
            }
            else if (category === 'Members') {
                response = await sendRequest(`http://localhost:8080/api/group`);
                const fullData: IGroupPageFullInfo = response.data;
                const data: IMember[] = fullData.members;
                setAdminMembersList(data);
            }
            else if (category === 'Videos') {
                response = await sendRequest(`http://localhost:8080/api/videos`);
                const data: IAdminVideoItem[] = response.data;
                setAdminVideosList(data);
            }
        } catch (error) {
            console.error('Error while fetching: ', error);
        }
    };

    useEffect(() => {
        fetchData(selectedCategory);
    }, [selectedCategory]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleDelete = (id: number): void => {
        console.log(`Видаляємо запис з ID: ${id}`);
        // setData(data.filter(item => item.id !== id));
    };

    const handleEdit = (id: number) => {
        // Здесь можно открыть модальное окно для редактирования
        console.log(`Изменяем запись с ID: ${id}`);
    };

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
                            adminNewsListProperties.map((item) => (
                                <th>{item}</th>
                            ))}
                        {selectedCategory === "Schedules" &&
                            adminSchedulesListProperties.map((item) => (
                                <th>{item}</th>
                            ))}
                        {selectedCategory === "Music" &&
                            adminMusicListProperties.map((item) => (
                                <th>{item}</th>
                            ))}
                        {selectedCategory === "Group info" &&
                            adminGroupInfoProperties.map((item) => (
                                <th>{item}</th>
                            ))}
                        {selectedCategory === "Members" &&
                            adminMembersListProperties.map((item) => (
                                <th>{item}</th>
                            ))}
                        {selectedCategory === "Videos" &&
                            adminVideosListProperties.map((item) => (
                                <th>{item}</th>
                            ))}
                    </tr>
                </thead>

                <tbody>
                    {getCurrentList()}
                    {/*{loading ?*/}
                    {/*    <tr>*/}
                    {/*        <td><Loading /></td>*/}
                    {/*    </tr>*/}
                    {/*    : data.length > 0 ? (*/}
                    {/*    data.map((item) => (*/}
                    {/*        <tr key={item.id}>*/}
                    {/*            <td>{item.id}</td>*/}
                    {/*            <td>{item.title}</td>*/}
                    {/*            <td>*/}
                    {/*                <Button onClick={() => handleEdit(item.id)}>*/}
                    {/*                    ✏️*/}
                    {/*                </Button>*/}
                    {/*                <Button onClick={() => handleDelete(item.id)}>*/}
                    {/*                    🗑️*/}
                    {/*                </Button>*/}
                    {/*            </td>*/}
                    {/*        </tr>*/}
                    {/*    ))*/}
                    {/*) : (*/}
                    {/*    <tr>*/}
                    {/*        <td>*/}
                    {/*            Даних немає*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}
                    {/*    )}*/}
                </tbody>
            </Table>
        </Container>
    );
};

export {AdminTable};