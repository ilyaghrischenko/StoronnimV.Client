import React, { FC } from "react";
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
                    {/* Левый блок с разделами */}
                    <Nav className="left-nav">
                        <Nav.Link as={NavLink} to="/schedule" className="link-item">
                            Афіша
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/news" className="link-item">
                            Новини
                        </Nav.Link>
                    </Nav>

                    <Navbar.Brand as={NavLink} to="/">
                        Стороннім В
                    </Navbar.Brand>

                    <Nav className="right-nav">
                        <Nav.Link as={NavLink} to="/music" className="link-item">
                            Музика
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/group" className="link-item">
                            Група
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </Container>
    );
};

export { Header };
