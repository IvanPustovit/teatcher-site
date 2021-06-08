import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import GalleryStudent from "../component/profile/GalleryStudent";
import HomeWork from "../component/profile/HomeWork";
import InfoStudent from "../component/profile/InfoStudent";
import Lessons from "../component/profile/Lessons";
import Rules from "../component/Rules";
import Spiner from "../component/spiner/Spiner";
import style from "../style/profile.module.css";

const Profile = ({ user }) => {
  const isAuth = useSelector((state) => state.platform.user.isAuth);
  const isUser = user.currentUser.user;

  return (
    <div className={style["container-fluid"]}>
      {!isUser ? <Spiner /> : !isUser.isRules && <Rules />}
      <div className="row">
        <nav
          className={`col-md-2 d-none d-md-block bg-light sidebar ${style.aside}`}
        >
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  to="/profile/info"
                  activeClassName={style.active}
                >
                  <i className="bi bi-discord"></i>
                  Загальна інформація
                  <span className="sr-only">(current)</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/profile/gallery"
                  activeClassName={style.active}
                >
                  <i className="bi bi-camera"></i>
                  Фотогалерея
                </NavLink>
              </li>
            </ul>
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Дистанційне навчання</span>
              <a
                className="d-flex align-items-center text-muted"
                href="#"
                aria-label="Add a new report"
              ></a>
            </h6>
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/profile/lesson"
                  activeClassName={style.active}
                >
                  <i className="bi bi-briefcase"></i>
                  Уроки
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/profile/task"
                  activeClassName={style.active}
                >
                  <i className="bi bi-book"></i>
                  Домашні завдання
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <Switch>
            {!isAuth && <Redirect to="/" />}
            <Route path="/profile/info">
              <InfoStudent user={isUser} />
            </Route>
            <Route path="/profile/gallery">
              <GalleryStudent user={isUser} />
            </Route>
            <Route path="/profile/lesson" component={Lessons} />
            <Route path="/profile/task">
              <HomeWork user={isUser} />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Profile;
