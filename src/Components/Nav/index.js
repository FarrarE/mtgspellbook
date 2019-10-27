import React from 'react';
import { LinkContainer } from "react-router-bootstrap";
import './styles.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


const NavigationMenu = (props) => {
  return (
    <Navbar className="navbar" color="dark" light expand="md">
        <NavbarBrand>
            <LinkContainer to="/"><h1>MTGSpellBook</h1></LinkContainer>
        </NavbarBrand>
        <Collapse navbar>
            <Nav className="ml-auto" navbar>
                <LinkContainer className="link" to="/signup">
                    <NavItem><h3>Signup</h3></NavItem>
                </LinkContainer>
                <LinkContainer className="link" to="/login">
                    <NavItem><h3>Login</h3></NavItem>
                </LinkContainer>
            </Nav>
        </Collapse>
    </Navbar>
  )
}

export default NavigationMenu;