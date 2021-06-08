import React from "react";
import { Modal, Spinner } from "react-bootstrap";

import style from "../style/modal.module.css";

const Loader = () => {
  return (
    <div>
      <Modal.Body className={style.modal}>
        <Spinner
          animation="border"
          variant="primary"
          className={style.spinner}
        />
      </Modal.Body>
    </div>
  );
};

export default Loader;
