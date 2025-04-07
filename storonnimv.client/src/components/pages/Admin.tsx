import {FC, ReactNode} from "react";
import {Container} from "react-bootstrap";
import {AdminContextProvider} from "../contexts/AdminContext.tsx";

interface IAdminProps {
    children: ReactNode;
}

const Admin: FC<IAdminProps> = ({children}) => {
    return (
        <AdminContextProvider>
            <div className='page-wrapper'>
                <Container className='page'>
                    {children}
                </Container>
            </div>
        </AdminContextProvider>
    );
};

export {Admin};