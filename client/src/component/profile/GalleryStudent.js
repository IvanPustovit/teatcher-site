import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ImgCard from "../forms/ImgCard";
import ButtonFunc from "../ButtonFunc";

import style from "../../style/gallery.module.css";
import Spiner from "../spiner/Spiner";
import { onLoader } from "../../redux/sliceReducer";
import { getFilesFetch, uploadFileFetch } from "../../redux/middleware/axios";
import UploadForm from "../forms/UploadForm";

const GalleryStudent = ({ user }) => {
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);
  const currentUser = useSelector(
    (state) => state.platform.user.currentUser.user
  );
  const dispatch = useDispatch();
  const [fileUpload, setFileUpload] = useState({});
  const [title, setTitle] = useState({});

  const createFile = (e) => {
    const file = e.target.files[0];
    setFileUpload(file);
  };

  const addTitle = (e) => {
    const titleValue = e.target.value;
    setTitle({ titleValue, typeDoc: user.classNumber });
  };

  const uploadDoc = (e) => {
    e.preventDefault();
    dispatch(uploadFileFetch({ fileUpload, title }));
    const form = document.getElementById("form-doc");
    form.reset();
  };

  useEffect(() => {
    dispatch(onLoader());
    dispatch(getFilesFetch(user.classNumber));
  }, []);

  return (
    <div>
      {currentUser._id === user._id && (
        <Form id="form-doc">
          <UploadForm
            typeName="imagesStudent"
            onChangeFile={createFile}
            onChange={addTitle}
            onClick={uploadDoc}
            accept="image/*"
          />
        </Form>
      )}

      <div className={style.card}>
        {loader && <Spiner />}
        {files.map((file) => (
          <div className={style.cardPhoto} key={file._id}>
            <ImgCard
              file={file}
              style={{ cardPhoto: style.photo, display: style.display }}
            />
            {file.user === user._id && (
              <ButtonFunc text="Видалити" typeBtn="delete" file={file} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryStudent;
