import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URI } from "../constant/constant";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMessage, onLoader } from "../redux/sliceReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const history = useHistory();

  const changePass = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(onLoader());
      const response = await axios.post(`${BASE_URI}/api/auth/reset`, {
        id: user.user._id,
        password: password,
      });
      dispatch(addMessage(response.data.message));
      setTimeout(() => {
        history.push("/login");
        dispatch(addMessage(""));
      }, 1500);
    } catch (error) {
      dispatch(addMessage(error.response.data.message));
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URI}/api/auth/reset${history.location.search}`)
      .then((res) => setUser(res.data));
  }, []);
  return (
    <>
      {user && (
        <Form>
          <Form.Group controlId="formGridEmail">
            <Form.Label>
              Email <em>*</em>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Напишіть Ваш email"
              name="email"
              defaultValue={user.user.email}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Ваше ім'я <em>*</em>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Напишіть Ваше ім'я"
              name="name"
              defaultValue={
                user.user.lastName + user.user.name + user.user.fatherName
              }
              disabled
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
              onChange={changePass}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Відправити
          </Button>
        </Form>
      )}
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
