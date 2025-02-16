import {Button, Form} from "react-bootstrap";
import {AdminContext} from "../../contexts/AdminContext.tsx";
import {FormEvent, useContext, useState} from "react";

const SearchForm = () => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error('AdminContext must be used within a AdminContextProvider');
    }

    const {fetchNewsItem, fetchVideoItem, selectedCategory} = adminContext;

    const [searchTitle, setSearchTitle] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        switch (selectedCategory) {
            case 'News':
                await fetchNewsItem(searchTitle);
                break;
            case 'Videos':
                await fetchVideoItem(searchTitle);
                break;
        }
    };

    return (
        <Form
            className='auth-form'
            onSubmit={handleSubmit}
        >
            <Form.Group
                controlId='searchFormTitle'
            >
                <Form.Label>
                    Title:
                </Form.Label>
                <Form.Control
                    type="text"
                    required
                    onChange={e => setSearchTitle(e.target.value)}/>
            </Form.Group>

            <Button
                type='submit'
                variant='primary'
                className='btn btn-primary'
            >
                Find
            </Button>
        </Form>
    );
};

export {SearchForm};