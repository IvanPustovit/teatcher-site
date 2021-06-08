import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilesFetch, uploadFileFetch } from "../../redux/middleware/axios";
import { onLoader } from "../../redux/sliceReducer";
import UploadForm from "../forms/UploadForm";
import { Form } from "react-bootstrap";
import Spiner from "../spiner/Spiner";
import ImgCard from "../forms/ImgCard";

import style from "../../style/gallery.module.css";
import ButtonFunc from "../ButtonFunc";

const PortfolioAdmin = () => {
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);
  const dispatch = useDispatch();
  const [fileUpload, setFileUpload] = useState({});
  const [title, setTitle] = useState({
    titleValue: "",
    typeDoc: "",
    typeProgress: "",
  });

  const createFile = (e) => {
    const file = e.target.files[0];
    setFileUpload(file);
  };
  const addTitle = (e) => {
    const titleValue = e.target.value;
    setTitle({ ...title, titleValue });
  };

  const selectEducation = (e) => {
    setTitle({ ...title, typeDoc: e.target.value });
  };

  const selectProgress = (e) => {
    setTitle({ ...title, typeProgress: e.target.value });
  };

  const uploadDoc = (e) => {
    e.preventDefault();
    dispatch(uploadFileFetch({ fileUpload, title }));
    const form = document.getElementById("form-doc");
    form.reset();
  };
  useEffect(() => {
    dispatch(onLoader());
    dispatch(getFilesFetch(title.typeDoc));
  }, [title.typeDoc]);
  return (
    <>
      {loader && <Spiner />}

      <div className={style.card}>
        {files.map((file) => (
          <div className={style.cardPhoto} key={file._id}>
            <ImgCard
              file={file}
              style={{ cardPhoto: style.photo, display: style.display }}
            />
            <ButtonFunc text="Видалити" typeBtn="delete" file={file} />
          </div>
        ))}
      </div>
      <div>
        <Form id="form-doc">
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Виберіть досягнення</Form.Label>
            <Form.Control as="select" onChange={selectEducation}>
              <option></option>
              <option value="progress">Мої досягнення</option>
              <option value="studentProject">Досягнення учнів</option>
              <option value="project">Спільні проєкти</option>
            </Form.Control>
          </Form.Group>
          {title.typeDoc === "progress" && (
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Виберіть категорію</Form.Label>
              <Form.Control as="select" onChange={selectProgress}>
                <option></option>
                <option value="education">Навчання</option>
                <option value="curses">Курси</option>
                <option value="webinar">Вебінари</option>
                <option value="lessons">Відкриті уроки</option>
              </Form.Control>
            </Form.Group>
          )}
          <UploadForm
            typeName="portfolio"
            onChangeFile={createFile}
            onChange={addTitle}
            onClick={uploadDoc}
            accept="application/msword, application/pdf, image/*"
          />
        </Form>
      </div>
    </>
  );
};

export default PortfolioAdmin;
