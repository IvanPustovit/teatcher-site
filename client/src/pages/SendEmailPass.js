import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { onLoader, addMessage } from "../redux/sliceReducer";
import { getStudents } from "../redux/middleware/axios";
import { BASE_URI } from "../constant/constant";

import { Form, Button } from "react-bootstrap";
import Spiner from "../component/spiner/Spiner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendEmailPass = () => {
  const initialForm = {
    // idStudent: "",
    email: "",
    classNumber: 0,
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
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(onLoader());
      const response = await axios.post(
        `${BASE_URI}/api/auth/reset-pass`,
        form
      );
      dispatch(addMessage(response.data.message));
      setTimeout(() => {
        history.push("/");
      }, 2000);
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
  }, [message, loader, form.classNumber]);

  return (
    <>
      {loader && <Spiner />}
      <Form onChange={changeHandler}>
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
        <Button variant="primary" type="submit" onClick={onSubmit}>
          Відправити
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default SendEmailPass;
