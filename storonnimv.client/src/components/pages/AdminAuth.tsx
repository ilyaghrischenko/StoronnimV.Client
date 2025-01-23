import {FC} from "react";
import {Container} from "react-bootstrap";
import {AdminContextProvider} from "../contexts/AdminContext.tsx";
import {AuthForm} from "../elements/admin/AuthForm.tsx";

const AdminAuth: FC = () => {
    return (
        <AdminContextProvider>
            <Container>
                <AuthForm />
            </Container>
        </AdminContextProvider>
    );
};

export {AdminAuth};