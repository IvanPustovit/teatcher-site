import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Form, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import style from "../../style/profile.module.css";
import { uploadAvatarFetch } from "../../redux/middleware/axios";

const Avatar = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [show, setShow] = useState(true);
  const [fileUpload, setFileUpload] = useState({});

  const createFile = (e) => {
    const file = e.target.files[0];
    setFileUpload(file);
  };

  const uploadDoc = () => {
    dispatch(
      uploadAvatarFetch({
        fileUpload,
        title: { titleValue: user.lastName, typeDoc: "avatar" },
      })
    );
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
          <Image
            src={user.avatar}
            roundedCircle
            className={style.avatarModal}
          />
          <Form>
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Виберіть фото"
                accept={"image/*"}
                onChange={createFile}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={uploadDoc}>
            Зберегти зміни
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Avatar;
