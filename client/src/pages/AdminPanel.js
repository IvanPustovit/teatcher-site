import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";
import { enterClass } from "../redux/sliceReducer";

import StudentList from "../component/adminPanel/StudentList";
import Doc from "../component/adminPanel/Doc";

import style from "../style/adminPanel/admin.module.css";
import "../style/bootstrap-icons.css";
import "../style/adminPanel/admin.css";
import Gallery from "../component/adminPanel/Gallery";
import PosterAdd from "../component/adminPanel/PosterAdd";
import PortfolioAdmin from "../component/adminPanel/PortfolioAdmin";
import GalleryStudent from "../component/adminPanel/GalleryStudent";
import LessonsAdmin from "../component/adminPanel/LessonsAdmin";
import HomeWorkAdmin from "../component/adminPanel/HomeWorkAdmin";
import GlobalInfo from "../component/adminPanel/GlobalInfo";
import StudentProfile from "../component/adminPanel/StudentProfile";

const AdminPanel = () => {
  const dispatch = useDispatch();

  const classNumber = (e) => {
    dispatch(enterClass(e.target.value));
  };
  return (
    <div>
      <div className={style.classNumber}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Виберіть клас</Form.Label>
          <Form.Control as="select" onChange={classNumber}>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
          </Form.Control>
        </Form.Group>
      </div>
      <div className={style["container-fluid"]}>
        <div className="row">
          <nav
            className={`col-md-2 d-none d-md-block bg-light sidebar ${style.aside}`}
          >
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    to="/admin/info"
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
                    to="/admin/students"
                    activeClassName={style.active}
                  >
                    <i className="bi bi-card-list"></i>
                    Список учнів
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/gallery"
                    activeClassName={style.active}
                  >
                    <i className="bi bi-camera"></i>
                    Фотогалерея
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/gallery-student"
                    activeClassName={style.active}
                  >
                    <i className="bi bi-camera"></i>
                    Фотогалерея учнів
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/documentation"
                    activeClassName={style.active}
                  >
                    <i className="bi bi-bookmarks"></i>
                    Нормативна документація
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/portfolio"
                    activeClassName={style.active}
                  >
                    <i className="bi bi-easel"></i>
                    Професійне портфоліо
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/idea"
                    activeClassName={style.active}
                  >
                    <i className="bi bi-lightbulb"></i>
                    Ідеї для творчості
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/poster"
                    activeClassName={style.active}
                  >
                    <i className="bi bi-receipt"></i>
                    Дошка подяки та оголошень
                  </NavLink>
                </li>
              </ul>
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Дистанційне навчання</span>
                {/* <a
                  className="d-flex align-items-center text-muted"
                  href="#"
                  aria-label="Add a new report"
                ></a> */}
              </h6>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/lesson"
                    activeClassName={style.active}
                  >
                    <i className="bi bi-briefcase"></i>
                    Уроки
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin/task"
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
              <Route path="/admin/info" exact component={GlobalInfo} />
              <Route path="/admin/info/:id" component={StudentProfile} />
              <Route path="/admin/students" component={StudentList} />
              <Route path="/admin/documentation" component={Doc} />
              <Route path="/admin/gallery" component={Gallery} />
              <Route path="/admin/gallery-student" component={GalleryStudent} />
              <Route path="/admin/poster" component={PosterAdd} />
              <Route path="/admin/portfolio" component={PortfolioAdmin} />
              <Route path="/admin/lesson" component={LessonsAdmin} />
              <Route path="/admin/task" component={HomeWorkAdmin} />
            </Switch>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
