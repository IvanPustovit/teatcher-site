import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilesFetch } from "../../redux/middleware/axios";
import { onLoader } from "../../redux/sliceReducer";
import Spiner from "../spiner/Spiner";
import ImgCard from "../forms/ImgCard";

import style from "../../style/gallery.module.css";
import ButtonFunc from "../ButtonFunc";

const Gallery = () => {
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);
  const classNumber = useSelector((state) => state.platform.classNumber);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onLoader());
    dispatch(getFilesFetch(classNumber));
  }, [classNumber]);

  return (
    <>
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
