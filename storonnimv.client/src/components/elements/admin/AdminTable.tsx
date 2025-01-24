import {FC, useContext, useEffect, useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";
import {Loading} from "../shared/Loading.tsx";

const AdminTable: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const { sendRequest, loading } = globalContext;

    const [data, setData] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('News');

    const fetchData = async (category: string) => {
        try {
            const response = await sendRequest(`http://localhost:8080/api/${category.toLowerCase()}`);

            const data: any[] = response.data;
            setData(data);
            console.dir(data);
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
        setData(data.filter(item => item.id !== id));
    };

    const handleEdit = (id: number) => {
        // Здесь можно открыть модальное окно для редактирования
        console.log(`Изменяем запись с ID: ${id}`);
    };

    return (
        <Container className='admin-container'>
            <Container className='admin-buttons-container'>
                {["News", "Schedules", "Music", "Group", "Videos"].map((category) => (
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
                        <th>id</th>
                        <th>title</th>
                        <th>actions</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ?
                        <tr>
                            <td><Loading /></td>
                        </tr>
                        : data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>
                                    <Button onClick={() => handleEdit(item.id)}>
                                        ✏️
                                    </Button>
                                    <Button onClick={() => handleDelete(item.id)}>
                                        🗑️
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                Даних немає
                            </td>
                        </tr>
                        )}
                </tbody>
            </Table>
        </Container>
    );
};

export {AdminTable};