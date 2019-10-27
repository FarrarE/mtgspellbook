import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import './styles.css';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem } from 'reactstrap';


const NavigationMenu = (props) => {



  return (
    <Navbar className="navbar" color="dark" light expand="md">
        <NavbarBrand>
            <LinkContainer to="/"><h1>MTGSpellBook</h1></LinkContainer>
        </NavbarBrand>
        <Collapse navbar>
            <Nav className="ml-auto" navbar>
                {props.isAuthenticated
                    ? <NavItem onClick={props.handleLogout}>Logout</NavItem>
                    : <>
                        <LinkContainer to="/signup">
                        <NavItem>Signup</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/login">
                        <NavItem>Login</NavItem>
                        </LinkContainer>
                    </>
                }
            </Nav>
        </Collapse>
    </Navbar>
  )
}

export default NavigationMenu;