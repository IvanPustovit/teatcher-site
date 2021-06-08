import React from "react";
import { Card } from "react-bootstrap";

const ImgCard = ({ file, style }) => {
  return (
    <>
      <div className={style.cardPhoto}>
        <Card className={style.display}>
          <Card.Img src={file.accessLink} />
        </Card>
        <Card.Footer>
          <Card.Title>{file.title}</Card.Title>
        </Card.Footer>
      </div>
    </>
  );
};

export default ImgCard;
