import {FC, useContext, useState} from "react";
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

    const savedPressedButtonName = sessionStorage.getItem('pressedButtonName') ?? '';
    const [pressedButtonName, setPressedButtonName] = useState<string>(savedPressedButtonName);

    const navLinkOnClick = (name: string) => {
        setPressedButtonName(name);
        sessionStorage.setItem('pressedButtonName', name);
    };

    return (
        <Container
            className="header-container"
        >
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container className="navbar-container">
                    <Navbar.Brand
                        as={NavLink}
                        to="/"
                        className="navbar-container__brand"
                        onClick={() => navLinkOnClick('')}
                    >
                        <Logo className='navbar-container__logo' />
                    </Navbar.Brand>

                    <Nav.Link
                        as={NavLink}
                        to="/schedule"
                        className={`navbar-container__link-item ${pressedButtonName !== 'schedule' ? 'basic-button' : 'basic-button-pressed'}`}
                        onClick={() => navLinkOnClick('schedule')}
                    >
                        Афіша
                    </Nav.Link>

                    <Nav.Link
                        as={NavLink}
                        to="/news"
                        className={`navbar-container__link-item ${pressedButtonName !== 'news' ? 'basic-button' : 'basic-button-pressed'}`}
                        onClick={() => navLinkOnClick('news')}
                    >
                        Новини
                    </Nav.Link>

                    <Nav.Link
                        as={NavLink}
                        to="/music"
                        className={`navbar-container__link-item ${pressedButtonName !== 'music' ? 'basic-button' : 'basic-button-pressed'}`}
                        onClick={() => navLinkOnClick('music')}
                    >
                        Музика
                    </Nav.Link>

                    <Nav.Link
                        as={NavLink}
                        to="/group"
                        className={`navbar-container__link-item ${pressedButtonName !== 'group' ? 'basic-button' : 'basic-button-pressed'}`}
                        onClick={() => navLinkOnClick('group')}
                    >
                        Група
                    </Nav.Link>

                    <Nav.Link
                        as={NavLink}
                        to="/video/sections"
                        className={`navbar-container__link-item ${pressedButtonName !== 'video/sections' ? 'basic-button' : 'basic-button-pressed'}`}
                        onClick={() => navLinkOnClick('video/sections')}
                    >
                        Відео
                    </Nav.Link>

                    {/*<Nav.Link as={NavLink} to="/developers" className="navbar-container__dev main-text">*/}
                    {/*    Розробники*/}
                    {/*</Nav.Link>*/}

                    {isAdmin && <Button onClick={logout} className="navbar-container__link-item main-text">
                        Вийти
                    </Button>}
                </Container>
            </Navbar>
        </Container>
    );
};

export {Header};
