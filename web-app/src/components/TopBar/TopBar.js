import React, { useState } from  "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
import { withRouter, Link } from "react-router-dom";
import {ACCESS_TOKEN_NAME} from '../../constants/constants';
import { Redirect } from "react-router";
import logo from '../../logo.svg';

function TopBar({props, location}) {
  const { pathname } = location;
  const [redirectLogin, setRedirectLogin] = useState(false);
  const [redirectProfile, setRedirectProfile] = useState(false);

  function renderOnBoardMethods() {
    if(localStorage.getItem(ACCESS_TOKEN_NAME)){
      return(
        <Nav className="ml-auto" navbar>
                <NavItem>
            <NavLink href="/profile">Профіль</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="#" onClick={() => handleLogout()}>Вийти</NavLink>
            </NavItem>
        </Nav>
            )
    }else{
      return(
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink  href="/signup">Реєстрація</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Увійти</NavLink>
          </NavItem>
        </Nav>
       )
    }

  }

  function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        setRedirectLogin(true);
        //props.history.push('/home')
    }
    function handleProfile() {
        //props.history.push('/profile')
        setRedirectProfile(true);
    }

  if(redirectLogin){
    return <Redirect to='/login' />
  }

  if(redirectProfile){
    return <Redirect to='/profile' />
  }

  return (
    <Navbar bg="secondary" expand="lg" variant="dark">
      <Navbar.Brand href="/" className="nav-link"><i className="fas fa-code"></i> DevConnectorChat</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" active={pathname == "/"}>
          Приєднайтеся до чату обраної компанії
          </Nav.Link>

          {renderOnBoardMethods()}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default withRouter(TopBar);