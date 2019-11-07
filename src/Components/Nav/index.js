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
    <Navbar className="nav" bg="dark" expand="lg">
        <Navbar.Brand href="/">
            <h1>MTGSpellbook</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            {props.isAuthenticated
                ? <>
                    <LinkContainer to="/collection">
                        <NavItem><h3>My Collection</h3></NavItem>
                    </LinkContainer>
                    <LinkContainer to="/my-deck">
                        <NavItem><h3>My Decks</h3></NavItem>
                    </LinkContainer>
                    <NavItem onClick={props.handleLogout}><h3>Logout</h3></NavItem>
                </>
                : <>
                    <LinkContainer to="/signup">
                    <NavItem><h3>Signup</h3></NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                    <NavItem><h3>Login</h3></NavItem>
                    </LinkContainer>
                </>
            }
        </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationMenu;