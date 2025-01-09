import React, {FC, useContext} from "react";
import {GlobalContext} from "../../contexts/shared/GlobalContext";
import {Container, Nav, Navbar} from "react-bootstrap";
import { NavLink } from "react-router-dom";

import '../../../styles/elements/shared/Header.css';

const Header: FC = () => {
    const globalContext = useContext(GlobalContext);

    if (!globalContext) {
        throw new Error("GlobalContext must be used within a GlobalContextProvider");
    }

    const {bgImage, headerTitle} = globalContext;

    return (
        <Container
            style={{backgroundImage: `url(${bgImage})`}}
            className='header-container'>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                <Container className='navbar-container'>
                    <Navbar.Brand
                        as={NavLink}
                        to="/">

                        Стороннім В
                    </Navbar.Brand>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto header">
                            <Nav.Link
                                as={NavLink}
                                to="/schedule"
                                className="link-item">

                                Афіша
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/news"
                                className="link-item">

                                Новини
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/music"
                                className="link-item">

                                Музика
                            </Nav.Link>
                            <Nav.Link
                                as={NavLink}
                                to="/group"
                                className="link-item">

                                Група
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="header-title-container">
                <p className="header-title">{headerTitle}</p>
            </Container>
        </Container>
    );
}

export {Header};