import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onLoader, addMessage } from "../../redux/sliceReducer";
import style from "../../style/register.module.css";

import Spiner from "../spiner/Spiner";
import { BASE_URI } from "../../constant/constant";
import { useHistory } from "react-router-dom";
import { getStudents } from "../../redux/middleware/axios";

const Register = () => {
  const initialForm = {
    name: "",
    lastName: "",
    fatherName: "",
    email: "",
    dateRegister: "",
    avatar: "",
    password: "",
    classNumber: 0,
    type: "",
    checked: false,
    birthday: "",
  };
  const dispatch = useDispatch();
  const message = useSelector((state) => state.platform.message);
  const loader = useSelector((state) => state.platform.loader);
  const students = useSelector((state) => state.platform.studentList);
  const history = useHistory();

  const [form, setForm] = useState(initialForm);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      dateRegister: Date.now(),
      checked: e.target.checked,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(onLoader());
      const response = await axios.post(
        `${BASE_URI}/api/auth/registration`,
        form
      );
      dispatch(addMessage(response.data.message));
      setTimeout(() => {
        history.push("/login");
      }, 1000);
    } catch (error) {
      dispatch(addMessage(error.response.data.message));
    }
  };
  useEffect(() => {
    if (message) {
      toast(message);
      dispatch(onLoader());
      dispatch(addMessage(""));
    }
    dispatch(getStudents(form.classNumber));
    if (form.student) {
      const index = students.map((el) => el._id).indexOf(form.student);
      setForm({
        ...form,
        name: students[index].name,
        lastName: students[index].lastName,
        fatherName: students[index].fatherName,
      });
    }
  }, [message, loader, form.classNumber, form.student]);

  return (
    <>
      {loader && <Spiner />}
      <div className={style.container}>
        <Form onChange={changeHandler}>
          <h2>Зареєструватися</h2>
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
          <Form.Group controlId="formGridState1">
            <Form.Label>
              Хто Ви <em>*</em>
            </Form.Label>
            <Form.Control as="select" defaultValue="..." name="type">
              <option>...</option>
              <option value="student">Учень (Учениця)</option>
              <option value="teacher">Учитель (Вчителька)</option>
            </Form.Control>
          </Form.Group>
          {form.type === "teacher" && (
            <>
              <Form.Group controlId="formGridEmail">
                <Form.Label>
                  Ваше ім'я <em>*</em>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Напишіть Ваше ім'я"
                  name="name"
                />
              </Form.Group>
              <Form.Group controlId="formGridEmail">
                <Form.Label>
                  Ваше прізвище <em>*</em>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Напишіть Ваше прізвище"
                  name="lastName"
                />
              </Form.Group>
              <Form.Group controlId="formGridEmail">
                <Form.Label>
                  По батькові <em>*</em>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Напишіть як Вас по батькові"
                  name="fatherName"
                />
              </Form.Group>
            </>
          )}
          {form.type === "student" && (
            <Form.Group controlId="formGridState">
              <Form.Label>Клас</Form.Label>
              <Form.Control as="select" defaultValue="..." name="classNumber">
                <option>...</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
              </Form.Control>
            </Form.Group>
          )}
          {students.length > 0 && (
            <Form.Group controlId="formGridState">
              <Form.Label>Прізвище Ім'я По батькові</Form.Label>
              <Form.Control as="select" defaultValue="..." name="student">
                <option>...</option>
                {students.map((el) => (
                  <option
                    key={el._id}
                    value={el._id}
                  >{`${el.lastName} ${el.name} ${el.fatherName}`}</option>
                ))}
              </Form.Control>
            </Form.Group>
          )}

          <Form.Group id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label="Я надаю згоду на обробку персональних даних"
              name="check"
            />
          </Form.Group>
          {form.checked && (
            <Button variant="primary" type="submit" onClick={onSubmit}>
              Зареєструватися
            </Button>
          )}
        </Form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
