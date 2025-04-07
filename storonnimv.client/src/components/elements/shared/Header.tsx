import {FC} from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

import logo from '../../../images/logo.svg';

const Header: FC = () => {
    return (
        <Container
            className="header-container"
        >
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container className="navbar-container">
                    <Navbar.Brand as={NavLink} to="/">
                        <img src={logo} alt='Logo' className='navbar-container__logo' />
                        {/*Стороннім В*/}
                    </Navbar.Brand>

                    <Nav.Link as={NavLink} to="/schedule" className="navbar-container__link-item">
                        Афіша
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/news" className="navbar-container__link-item">
                        Новини
                    </Nav.Link>

                    <Nav.Link as={NavLink} to="/music" className="navbar-container__link-item">
                        Музика
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/group" className="navbar-container__link-item">
                        Група
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/video/sections" className="navbar-container__link-item">
                        Відео
                    </Nav.Link>
                </Container>
            </Navbar>
        </Container>
    );
};

export {Header};
