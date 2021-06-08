import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logOutUser } from "../redux/sliceReducer";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.platform.user.isAuth);

  const logOut = () => {
    dispatch(logOutUser());
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/">
        <Navbar.Brand>React-Bootstrap</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link> */}
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {isAuth ? (
          <Nav>
            <Link to={"/"} className="nav-link" onClick={logOut}>
              Вийти
            </Link>
          </Nav>
        ) : (
          <Nav>
            <Link to={"/register"} className="nav-link">
              Реєстрація
            </Link>
            <Link to="/login" className="nav-link">
              Увійти
            </Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
