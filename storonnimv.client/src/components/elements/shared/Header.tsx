import {FC} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

// @ts-ignore
import Logo from '../../../assets/logo.svg?react';

const Header: FC = () => {
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
                </Container>
            </Navbar>
        </Container>
    );
};

export {Header};
