import React, { useEffect } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Item from "../component/documentation/Item";
import Spiner from "../component/spiner/Spiner";

import img from "../image/docPage.webp";
import download from "../image/dowln.webp";
import { getFilesFetch } from "../redux/middleware/axios";
import { onLoader } from "../redux/sliceReducer";

import style from "../style/adminPanel/docPage.module.css";

const Documentation = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);

  useEffect(() => {
    dispatch(getFilesFetch("regulatory"));
    dispatch(onLoader());
  }, []);

  return (
    <Container
      fluid={true}
      className={style.main}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className={style.section}>
        <div className={style.act}>
          <Card
            border="primary"
            style={{ width: "18rem" }}
            className={style.card}
          >
            <Card.Body>
              <Card.Title>
                Закон України від 05.09.2017 № 2145-VIII "Про освіту"
              </Card.Title>
            </Card.Body>
            <a
              href="https://zakon.rada.gov.ua/laws/show/2145-19#Text"
              variant="light"
              className={style.download}
              style={{ backgroundImage: `url(${download})` }}
              target="_blank"
            >
              ПЕРЕЙТИ
            </a>
          </Card>
        </div>
        <div className={style.documentation}>
          {loader && <Spiner />}
          {files.map((file) => (
            <Item file={file} key={file._id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Documentation;
