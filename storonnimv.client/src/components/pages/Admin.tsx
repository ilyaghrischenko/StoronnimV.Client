import {FC, ReactNode} from "react";
import {Container} from "react-bootstrap";
import {AdminContextProvider} from "../contexts/AdminContext.tsx";

interface IAdminProps {
    children: ReactNode;
}

const Admin: FC<IAdminProps> = ({children}) => {
    return (
        <AdminContextProvider>
            <Container>
                {children}
            </Container>
        </AdminContextProvider>
    );
};

export {Admin};