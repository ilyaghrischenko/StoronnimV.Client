import { FC } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "../../../styles/elements/shared/Header.css";

const Header: FC = () => {
    return (
        <Container
            className="header-container"
        >
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container className="navbar-container">
                    <Nav className="navbar-container__left-nav">
                        <Nav.Link as={NavLink} to="/schedule" className="navbar-container__link-item">
                            Афіша
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/news" className="navbar-container__link-item">
                            Новини
                        </Nav.Link>
                    </Nav>

                    <Navbar.Brand as={NavLink} to="/">
                        Стороннім В
                    </Navbar.Brand>

                    <Nav className="navbar-container__right-nav">
                        <Nav.Link as={NavLink} to="/music" className="navbar-container__link-item">
                            Музика
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/group" className="navbar-container__link-item">
                            Група
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/video/sections" className="navbar-container__link-item">
                            Відео
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </Container>
    );
};

export { Header };
