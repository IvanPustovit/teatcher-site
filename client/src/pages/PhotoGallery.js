import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImgCard from "../component/forms/ImgCard";
import Spiner from "../component/spiner/Spiner";
import { getFilesFetch } from "../redux/middleware/axios";
import { onLoader } from "../redux/sliceReducer";

import style from "../style/photoPage.module.css";

const PhotoGallery = () => {
  const dispatch = useDispatch();
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);

  useEffect(() => {
    dispatch(onLoader());
    dispatch(getFilesFetch("images"));
  }, []);
  return (
    <>
      {loader && <Spiner />}
      <div className={style.gallery}>
        {files.map((file) => (
          <ImgCard
            file={file}
            style={{ cardPhoto: style.cardPhoto, display: style.display }}
            key={file._id}
          />
        ))}
      </div>
    </>
    
  );
};

export default PhotoGallery;
