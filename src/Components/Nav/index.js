import React from 'react';
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
    <div>
    <Navbar className="navbar" color="dark" light expand="md">
        <NavbarBrand href="/">
            <div>MTGSpellBook</div>
        </NavbarBrand>
        <Collapse navbar>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/components/">
                        <div>Login</div>
                    </NavLink>
                </NavItem>
            </Nav>
        </Collapse>
    </Navbar>
  </div>
  )
}

export default NavigationMenu;