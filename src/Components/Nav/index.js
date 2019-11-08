import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import './styles.css';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem } from 'react-bootstrap';


const NavigationMenu = (props) => {

  return (
    <Navbar className="nav" bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
            <h2>MTGSpellbook</h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {props.isAuthenticated
                ? <>
                    <LinkContainer to="/collection">
                        <NavItem><h5>My Collection</h5></NavItem>
                    </LinkContainer>
                    <LinkContainer to="/my-deck">
                        <NavItem><h5>My Decks</h5></NavItem>
                    </LinkContainer>
                    <NavItem onClick={props.handleLogout}><h5>Logout</h5></NavItem>
                </>
                : <>
                    <LinkContainer to="/signup">
                    <NavItem><h5>Signup</h5></NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                    <NavItem><h5>Login</h5></NavItem>
                    </LinkContainer>
                </>
            }
        </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationMenu;