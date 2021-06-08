import React, { useEffect, useState } from "react";
import { Form, ListGroup, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { BASE_URI } from "../../constant/constant";
import { onLoader } from "../../redux/sliceReducer";
import Spiner from "../spiner/Spiner";

import style from "../../style/adminPanel/admin.module.css";

const StudentList = () => {
  const initialState = {
    name: "",
    lastName: "",
    fatherName: "",
  };
  const dispatch = useDispatch();
  const classNumber = useSelector((state) => state.platform.classNumber);
  const loader = useSelector((state) => state.platform.loader);
  const [form, setForm] = useState(initialState);
  const [students, setStudents] = useState([]);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value.toUpperCase(),
      classNumber,
    });
  };

  const submit = async (e) => {
    try {
      //   const formReset = e.target.parentElement.parentElement;
      const response = await axios.post(`${BASE_URI}/api/students`, form);
      api();
      toast(response.data.message);
      setForm(initialState);
      //   formReset.reset(formReset);
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    }
  };

  const editStudent = (el) => {
    setForm(el);
  };

  const deleteStudent = async (el) => {
    const id = el._id;
    try {
      await axios.delete(`${BASE_URI}/api/students/${id}`);
      api();
    } catch (error) {
      console.log(error);
    }
  };

  async function api() {
    try {
      dispatch(onLoader());
      const response = await axios.get(
        `${BASE_URI}/api/students/${classNumber}`
      );
      setStudents(response.data);
      dispatch(onLoader());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    api();
  }, [classNumber]);

  return (
    <>
      <div>
        <div
          className={`d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ${style.title}`}
        >
          <h1 className="h2">Список учнів</h1>
        </div>

        <ListGroup>
          {loader && <Spiner />}
          {students
            .sort((a, b) =>
              a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0
            )
            .map((el) => (
              <ListGroup.Item className={style.item} key={el._id}>
                {`${el.lastName} ${el.name} ${el.fatherName}`}
                <div>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      editStudent(el);
                    }}
                  >
                    Редагувати
                  </Button>
                  <Button
                    variant="outline-dark"
                    onClick={() => {
                      deleteStudent(el);
                    }}
                  >
                    Видалити
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>

      <Form className={style.form} onChange={changeHandler}>
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="Прізвище учня"
              className={style.input}
              name="lastName"
              value={form.lastName}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Ім'я учня"
              className={style.input}
              name="name"
              value={form.name}
            />
          </Col>{" "}
          <Col>
            <Form.Control
              placeholder="По батькові учня"
              className={style.input}
              name="fatherName"
              value={form.fatherName}
            />
          </Col>
          <Button variant="success" onClick={submit}>
            Записати
          </Button>
        </Form.Row>
      </Form>
      <ToastContainer />
    </>
  );
};

export default StudentList;
