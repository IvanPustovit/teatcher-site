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

const Gallery = () => {
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);
  const dispatch = useDispatch();
  const [fileUpload, setFileUpload] = useState({});
  const [title, setTitle] = useState({});

  const createFile = (e) => {
    const file = e.target.files[0];
    setFileUpload(file);
  };
  const addTitle = (e) => {
    const titleValue = e.target.value;
    setTitle({ titleValue, typeDoc: e.target.name });
  };

  const uploadDoc = (e) => {
    e.preventDefault();
    dispatch(uploadFileFetch({ fileUpload, title }));
    const form = document.getElementById("form-doc");
    form.reset();
  };

  useEffect(() => {
    dispatch(onLoader());
    dispatch(getFilesFetch("images"));
  }, []);

  return (
    <>
      <div>
        <Form id="form-doc">
          <UploadForm
            typeName="images"
            onChangeFile={createFile}
            onChange={addTitle}
            onClick={uploadDoc}
            accept="image/*"
          />
        </Form>
      </div>

      <div className={style.card}>
        {loader && <Spiner />}
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
    </>
  );
};

export default Gallery;
