import React, { useEffect, useState } from "react";
import { Navbar, Nav, Image, Container } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";

import style from "../../style/nav.module.css";
import img from "../../image/name.webp";
import ButtonOut from "../ButtonOut";

const Navigation = ({ user }) => {
  const isAuth = user.isAuth;
  const [historyPath, setHistoryPath] = useState();
  const history = useHistory();
  const activeClass = (e) => {
    const arr = document.querySelectorAll(`.${style.linkBg}`);
    if (e.target.tagName === "A") {
      for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        el.classList.remove(`${style.active}`);
      }
    }
  };

  const activeLink = () => {
    switch (!historyPath ? history.location.pathname : historyPath) {
      case "/":
        return document
          .getElementById("card")
          .parentElement.classList.add(style.active);
      case "/document":
        return document
          .getElementById("document")
          .parentElement.classList.add(style.active);
      case "/portfolio":
        return document
          .getElementById("portfolio")
          .parentElement.classList.add(style.active);
      case "/idea":
        return document
          .getElementById("idea")
          .parentElement.classList.add(style.active);
      case "/photo":
        return document
          .getElementById("gallery")
          .parentElement.classList.add(style.active);
      case "/login":
        return document
          .getElementById("cabinet")
          .parentElement.classList.add(style.active);

      default:
        return;
    }
  };

  useEffect(() => {
    history.listen((location) => {
      setHistoryPath(location.pathname);
    });
    activeLink();
  }, [historyPath]);

  return (
    <>
      <div className={style.img}>
        <Image
          src="/5c07adcb33d07285d3c530a85e310281 1.png"
          fluid
          className={style.img}
        />
        <Container fluid="true" className={style.title}>
          <img src={img} />
        </Container>
      </div>
      <Navbar collapseOnSelect expand="lg" className={style.nav}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className={style.list}>
          <Nav onClick={activeClass}>
            <div className={`${style.linkBg}`}>
              <NavLink to="/" className={style.link} id="card">
                ВІЗИТКА ВЧИТЕЛЯ
              </NavLink>
            </div>
            <div className={`${style.linkBg}`}>
              <NavLink to="/document" className={style.link} id="document">
                НОРМАТИВНА ДОКУМЕНТАЦІЯ
              </NavLink>
            </div>
            <div className={`${style.linkBg}`}>
              <NavLink to="/portfolio" className={style.link} id="portfolio">
                ПРОФЕСІЙНЕ ПОРТФОЛІО
              </NavLink>
            </div>
            <div className={`${style.linkBg}`}>
              <NavLink to="/idea" className={style.link} id="idea">
                ІДЕЇ ДЛЯ ТВОРЧОСТІ
              </NavLink>
            </div>
            <div className={`${style.linkBg}`}>
              <NavLink to="/photo" className={style.link} id="gallery">
                ФОТОГАЛЕРЕЯ
              </NavLink>
            </div>
            <div className={`${style.linkBg}`}>
              {isAuth ? (
                user.currentUser.user.email === "teatchertrud@gmail.com" ? (
                  <NavLink to="/admin/info" className={style.link} id="cabinet">
                    ОСОБИСТИЙ КАБІНЕТ
                  </NavLink>
                ) : (
                  <NavLink
                    to="/profile/info"
                    className={style.link}
                    id="cabinet"
                  >
                    ОСОБИСТИЙ КАБІНЕТ
                  </NavLink>
                )
              ) : (
                <NavLink to="/login" className={style.link} id="cabinet">
                  ОСОБИСТИЙ КАБІНЕТ
                </NavLink>
              )}
            </div>
            {isAuth && <ButtonOut />}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
