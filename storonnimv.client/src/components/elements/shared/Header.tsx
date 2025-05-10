import {FC, useContext} from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

// @ts-ignore
import Logo from '../../../assets/logo.svg?react';
import {GlobalContext} from "../../contexts/shared/GlobalContext.tsx";

const Header: FC = () => {
    const { sendRequest, isAdmin, setIsAdmin, serverRoute } = useContext(GlobalContext)!;

    const logout = async () => {
        try {
            const response = await sendRequest(
                `${serverRoute}/admin/logout`,
                'POST'
            );

            if (response.status === 200) {
                setIsAdmin(false);
                sessionStorage.removeItem('role');
            }
        } catch (error) {
            console.error("Error while logging out: ", error);
        }
    };

    return (
        <Container
            className="header-container"
        >
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container className="navbar-container">
                    <Navbar.Brand as={NavLink} to="/" className="navbar-container__brand">
                        <Logo className='navbar-container__logo' />
                    </Navbar.Brand>

                    <Nav.Link as={NavLink} to="/schedule" className="navbar-container__link-item basic-button">
                        Афіша
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/news" className="navbar-container__link-item basic-button">
                        Новини
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/music" className="navbar-container__link-item basic-button">
                        Музика
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/group" className="navbar-container__link-item basic-button">
                        Група
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/video/sections" className="navbar-container__link-item basic-button">
                        Відео
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/developers" className="navbar-container__dev main-text">
                        Розробники
                    </Nav.Link>

                    {isAdmin && <Button onClick={logout} className="navbar-container__link-item main-text">
                        Вийти
                    </Button>}
                </Container>
            </Navbar>
        </Container>
    );
};

export {Header};
