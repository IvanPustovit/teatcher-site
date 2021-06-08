import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Carousel, ListGroup, Row, Tab } from "react-bootstrap";

import openBook from "../../image/bookOpen.webp";
import style from "../../style/portfolio.module.css";
import { getFilesFetchProgress } from "../../redux/middleware/axios";
import { Link } from "react-router-dom";
import Spiner from "../spiner/Spiner";
import { onLoader } from "../../redux/sliceReducer";

const BookOpen = ({ onClick, docType, file }) => {
  const dispatch = useDispatch();
  const portfolioContent = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);

  const [progress, setProgress] = useState("education");

  const open = (e) => {
    if (e.target.tagName === "DIV") {
      const modal = document.getElementById("openBook");
      modal.classList.add(style.closed);
      setTimeout(() => {
        modal.classList.remove(style.open);
        modal.classList.remove(style.closed);
      }, 1800);
    }
  };

  const progressHandler = (e) => {
    setProgress(e.target.id);
  };

  useEffect(() => {
    dispatch(onLoader());
    dispatch(getFilesFetchProgress(progress));
  }, [progress]);

  return (
    <div
      className={`${style.book} view`}
      style={{ backgroundImage: `url(${openBook})` }}
      onClick={open}
      id="openBook"
    >
      {docType === "education" && (
        <>
          <div className={style.list}>
            <h2>Мої досягнення</h2>
            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#education"
            >
              <Row>
                <ListGroup className={style.group}>
                  <ListGroup.Item action href="#education">
                    <Link
                      className={style.link}
                      to="/portfolio/education"
                      id="education"
                      onClick={progressHandler}
                    >
                      НАВЧАННЯ
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item action href="#curses">
                    <Link
                      className={style.link}
                      to="/portfolio/curses"
                      id="curses"
                      onClick={progressHandler}
                    >
                      КУРСИ
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item action href="#webinar">
                    <Link
                      className={style.link}
                      to="/portfolio/webinar"
                      id="webinar"
                      onClick={progressHandler}
                    >
                      ВЕБІНАРИ
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item action href="#lessons">
                    <Link
                      className={style.link}
                      to="/portfolio/lessons"
                      id="lessons"
                      onClick={progressHandler}
                    >
                      ВІДКРИТІ УРОКИ
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </Row>
            </Tab.Container>
          </div>
          <div className={style.slide}>
            {loader && <Spiner />}
            <Carousel>
              {portfolioContent.map((el) => (
                <Carousel.Item className={style.item}>
                  <Carousel.Caption className={style.content}>
                    <h3>{el.title}</h3>
                    <p></p>
                  </Carousel.Caption>
                  <img
                    className="d-block w-100"
                    src={el.accessLink}
                    alt={el.name}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
};

export default BookOpen;
