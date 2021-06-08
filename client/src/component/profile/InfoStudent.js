import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import style from "../../style/profile.module.css";
import { Link, Route, Switch } from "react-router-dom";
import ModalUpdate from "./Modal";
import Avatar from "./Avatar";
import img from "../../image/avatarka.webp";

const InfoStudent = ({ user }) => {
  const currentUser = useSelector(
    (state) => state.platform.user.currentUser.user
  );
  return (
    <>
      <div>
        <Container>
          <Row className={style.container}>
            <Col xs={6} md={4} className={style.avatar}>
              <Image
                src={user.avatar === "" ? img : user.avatar}
                roundedCircle
                className={style.img}
              />
              {currentUser._id === user._id && (
                <Link to="/profile/info/avatar">Завантажити</Link>
              )}
            </Col>
            <Col xs={6} className={style.info}>
              <Card>
                <Card.Body>
                  <Card.Title>{`${user.lastName} ${user.name} ${user.fatherName}`}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted pb-2 pt-4">
                    email: {user.email}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted pb-2">
                    Клас: {user.classNumber}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted pb-3">
                    Я народився/народилася:{" "}
                    {user.birthday === ""
                      ? ""
                      : new Date(user.birthday).toLocaleString("uk-ua", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                  </Card.Subtitle>
                  <Card.Subtitle
                    className={`mb-2 text-muted pb-3 ${style.ambition}`}
                  >
                    <p> Моя мрія:</p>
                    <span>{user.ambition}</span>
                  </Card.Subtitle>
                  {currentUser._id === user._id && (
                    <Link to="/profile/info/update">Редагувати</Link>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container>
          <Switch>
            <Route path="/profile/info/update">
              <ModalUpdate user={user} />
            </Route>
            <Route path="/profile/info/avatar">
              <Avatar user={user} />
            </Route>
          </Switch>
        </Container>
      </div>
    </>
  );
};

export default InfoStudent;
