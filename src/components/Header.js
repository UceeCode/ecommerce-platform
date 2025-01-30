import React, { useContext, useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { ThemeContext } from '../GlobalComponents/ThemeProvider';
import { BiSun, BiMoon, BiCart } from 'react-icons/bi';
import { VscAccount } from 'react-icons/vsc';
import { Link } from "@reach/router";
import { useCart } from "react-use-cart";
import '../components/Header.css'; // Custom styles

const Header = () => {
    const { theme, setThemeMode } = useContext(ThemeContext); 
    const [darkMode, setDarkMode] = useState(theme);

    useEffect(() => {
        setThemeMode(darkMode);
        console.log(darkMode);
    }, [darkMode]);

    const { isEmpty, totalItems } = useCart();

    return (
        <Navbar collapseOnSelect expand="md" className={`custom-navbar ${darkMode ? 'dark' : 'light'}`}>
            <Container>
                <Link to="/" className="brand-logo">
                    <Navbar.Brand className='logo'>SnapBuy</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link className="nav-icon" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <BiSun size="1.7rem" /> : <BiMoon size="1.7rem" />}
                        </Nav.Link>
                        <Link to="/cart" className="nav-cart">
                            <BiCart size="2rem" />
                            {!isEmpty && <span className="cart-badge">{totalItems}</span>}
                            <span className="cart-text">Cart</span>
                        </Link>
                        <Link to="my-account" className="nav-account">
                            <VscAccount size="1.8rem" />
                            <span>My Account</span>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
