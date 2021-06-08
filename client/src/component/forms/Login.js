import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { getUser } from "../../redux/middleware/axios";
import { addMessage, onLoader } from "../../redux/sliceReducer";
import Spiner from "../spiner/Spiner";

import style from "../../style/register.module.css";

const Login = () => {
  const initialForm = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const message = useSelector((state) => state.platform.message);
  const loader = useSelector((state) => state.platform.loader);
  const isAuth = useSelector((state) => state.platform.user.isAuth);

  const [form, setForm] = useState(initialForm);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(onLoader());
    dispatch(getUser(form));
  };

  useEffect(() => {
    if (isAuth) {
      history.push("/profile/info");
    }
    if (message) {
      toast(message);
      dispatch(onLoader());
      dispatch(addMessage(""));
    }
  }, [message, isAuth, dispatch, history]);

  return (
    <>
      {loader && <Spiner />}
      <div className={style["login-container"]}>
        <Form onChange={changeHandler}>
          <h2>Вітаю на сайті</h2>

          <Form.Group controlId="formGridEmail">
            <Form.Label>
              Email <em>*</em>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Напишіть Ваш email"
              name="email"
            />
          </Form.Group>

          <Form.Group controlId="formGridPassword">
            <Form.Label>
              Пароль <em>*</em>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Ваш пароль"
              name="password"
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={onSubmit}>
            Увійти
          </Button>
          <Link to="/register" className={style.link}>
            Зареєструватися
          </Link>
          <Link to="/sendEmail" className={style.link}>
            Відновити пароль
          </Link>
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
