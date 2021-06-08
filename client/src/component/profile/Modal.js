import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from "../../redux/middleware/axios";

const ModalUpdate = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [form, setForm] = useState({
    id: user._id,
    email: user.email,
    birthday: user.birthday,
    ambition: user.ambition,
  });

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitUpdate = () => {
    dispatch(updateUser(form));
    history.push("/profile/info");
  };

  const handleClose = () => {
    history.push("/profile/info");
    setShow(false);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{`${user.lastName} ${user.name} ${user.fatherName}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onChange={handleForm}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Ваш email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Напишіть email"
                defaultValue={user.email}
                name="email"
                required
              />
              <br />
              <Form.Label>Ваш День народження</Form.Label>
              <Form.Control
                type="date"
                placeholder="Normal text"
                name="birthday"
                defaultValue={user.birthday}
              />
              <br />
              <Form.Label>Опишіть свою мрію</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="ambition"
                defaultValue={user.ambition}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={submitUpdate}>
            Зберегти зміни
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdate;
