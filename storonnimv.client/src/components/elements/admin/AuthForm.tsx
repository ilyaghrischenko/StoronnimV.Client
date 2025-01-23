import {FC, FormEvent, useContext, useState} from "react";
import {Button, Form} from "react-bootstrap";
import {AdminContext} from "../../contexts/AdminContext.tsx";
import {ILogInRequest} from "../../../models/admin/ILogInRequest.ts";

const AuthForm: FC = () => {
    const adminContext = useContext(AdminContext);

    if (!adminContext) {
        throw new Error('AdminContext must be used within a AdminContextProvider');
    }

    const {logIn} = adminContext;

    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const logInRequest: ILogInRequest = {
            login: login,
            password: password
        }

        await logIn(logInRequest);
    };

    return (
        <Form
            onSubmit={handleSubmit}
            className='auth-form'
        >
            <Form.Group
                controlId="formAdminLogin"
                className='form-group'
            >
                <Form.Label className='form-group__label'>Login:</Form.Label>
                <Form.Control
                    className='form-group__control'
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group
                className='form-group'
                controlId="formAdminPassword"
            >
                <Form.Label className='form-group__label'>Password:</Form.Label>
                <Form.Control
                    className='form-group__control'
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button
                className='auth-form__button button'
                variant="primary"
                type="submit"
            >
                Увійти
            </Button>
        </Form>
    );
};

export {AuthForm};