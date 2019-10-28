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
                    ? <>
                        <LinkContainer to="/signup">
                            <NavItem><h3>My Collection</h3></NavItem>
                        </LinkContainer>
                        <LinkContainer to="/signup">
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
            </Nav>
        </Collapse>
    </Navbar>
  )
}

export default NavigationMenu;