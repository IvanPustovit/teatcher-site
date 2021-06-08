import React from "react";

import { Button, Card } from "react-bootstrap";
import download from "../../image/dowln.png";

import style from "../../style/adminPanel/docPage.module.css";
import { downloadFile } from "../../redux/middleware/axios";

const Item = ({ file }) => {
  const downloadClick = (e) => {
    e.stopPropagation();
    downloadFile(file);
  };
  return (
    <div>
      <Card border="primary" style={{ width: "18rem" }} className={style.card}>
        <Card.Body>
          <Card.Title>{file.title}</Card.Title>
        </Card.Body>
        <Button
          variant="light"
          className={style.download}
          style={{ backgroundImage: `url(${download})` }}
          onClick={downloadClick}
        >
          ЗАВАНТАЖИТИ
        </Button>
      </Card>
    </div>
  );
};

export default Item;
