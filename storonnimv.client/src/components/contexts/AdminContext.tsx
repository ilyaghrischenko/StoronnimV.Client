import {createContext, FC, ReactNode, useContext, useState} from "react";
import {GlobalContext} from "./shared/GlobalContext.tsx";
import {ILogInRequest} from "../../models/admin/ILogInRequest.ts";
import {useNavigate} from "react-router-dom";
import {IAdminNewsItem} from "../../models/admin/IAdminNewsItem.ts";
import {IAdminScheduleItem} from "../../models/admin/IAdminScheduleItem.ts";
import {IAdminMusicItem} from "../../models/admin/IAdminMusicItem.ts";
import {IGroupInfo, IGroupPageFullInfo, IMember} from "../../models/group/IGroupInfo.ts";
import {IAdminVideoItem} from "../../models/admin/IAdminVideoItem.ts";
import {AdminNewsList} from "../elements/admin/TableItems/List/AdminNewsList.tsx";
import {AdminSchedulesList} from "../elements/admin/TableItems/List/AdminSchedulesList.tsx";
import {AdminMusicList} from "../elements/admin/TableItems/List/AdminMusicList.tsx";
import {AdminGroupInfo} from "../elements/admin/TableItems/AdminGroupInfo.tsx";
import {AdminMembersList} from "../elements/admin/TableItems/List/AdminMembersList.tsx";
import {AdminVideoList} from "../elements/admin/TableItems/List/AdminVideoList.tsx";
import {AxiosResponse} from "axios";

interface AdminContextType {
    logIn: (logInRequest: ILogInRequest) => Promise<void>;
    loading: boolean;
    handleEdit: (apiUrl: string) => void;
    handleDelete: (apiUrl: string) => void;
    getCurrentList: () => ReactNode;
    fetchData: (category: string) => Promise<void>;
    handleCategoryChange: (category: string) => void;
    selectedCategory: string;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminContextProviderProps {
    children: ReactNode;
}

const AdminContextProvider: FC<AdminContextProviderProps> = ({children}) => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;

    const navigate = useNavigate();

    const logIn = async (logInRequest: ILogInRequest) => {
        try {
            const response = await sendRequest(
                'http://localhost:8080/api/account/login',
                'POST',
                JSON.stringify({login: logInRequest.login, password: logInRequest.password}),
                { 'Content-Type': 'application/json' });

            if (response.status === 401) {
                alert(response.statusText + '!!! Не вірні дані');
                return;
            }

            const data: string = response.data;

            sessionStorage.setItem('token', data);
            navigate('/admin/main', {replace: true});
        } catch (error) {
            console.error(`error while logging in: ${error}`);
            return;
        }
    };

    const [adminNewsList, setAdminNewsList] = useState<IAdminNewsItem[]>([]);
    const [adminSchedulesList, setAdminSchedulesList] = useState<IAdminScheduleItem[]>([]);
    const [adminMusicList, setAdminMusicList] = useState<IAdminMusicItem[]>([]);
    const [adminGroupInfo, setAdminGroupInfo] = useState<IGroupInfo>({} as IGroupInfo);
    const [adminMembersList, setAdminMembersList] = useState<IMember[]>([]);
    const [adminVideosList, setAdminVideosList] = useState<IAdminVideoItem[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<string>('News');

    const getCurrentList = (): ReactNode => {
        if (selectedCategory === 'News') {
            return adminNewsList.length > 0 ? <AdminNewsList items={adminNewsList} /> : <p>no data</p>;
        }
        else if (selectedCategory === 'Schedules') {
            return adminSchedulesList.length > 0 ? <AdminSchedulesList items={adminSchedulesList} /> : <p>no data</p>;
        }
        else if (selectedCategory === 'Music') {
            return selectedCategory.length > 0 ? <AdminMusicList items={adminMusicList} /> : <p>no data</p>;
        }
        else if (selectedCategory === 'Group info') {
            return adminGroupInfo ? <AdminGroupInfo item={adminGroupInfo} /> : <p>no data</p>;
        }
        else if (selectedCategory === 'Members') {
            return adminMembersList.length > 0 ? <AdminMembersList items={adminMembersList} /> : <p>no data</p>;
        }
        else if (selectedCategory === 'Videos') {
            return adminVideosList.length > 0 ? <AdminVideoList items={adminVideosList} /> : <p>no data</p>;
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

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleDelete = (apiUrl: string): void => {
        console.log(`Видаляємо запис on api: ${apiUrl}`);
        // setData(data.filter(item => item.id !== id));
    };

    const handleEdit = (apiUrl: string) => {
        // Здесь можно открыть модальное окно для редактирования
        console.log(`Изменяем запись on api: ${apiUrl}`);
    };

    const value: AdminContextType = {
        logIn,
        loading,
        handleEdit,
        handleDelete,
        getCurrentList,
        fetchData,
        handleCategoryChange,
        selectedCategory
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export { AdminContextProvider, AdminContext };