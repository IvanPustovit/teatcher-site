import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getFilesLessonFetch } from "../../redux/middleware/axios";
import Item from "../documentation/Item";
import Spiner from "../spiner/Spiner";

import style from "../../style/adminPanel/docPage.module.css";
import { onLoader } from "../../redux/sliceReducer";

const Lessons = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.platform.user.currentUser.user);
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);

  const [date, setDate] = useState();

  const dateHandler = (e) => {
    setDate(e.target.valueAsNumber);
  };

  useEffect(() => {
    dispatch(onLoader());

    dispatch(
      getFilesLessonFetch({
        title: {
          classNumber: user.classNumber,
          dateLesson: date,
          typeDoc: "lesson",
        },
      })
    );
  }, [date]);
  return (
    <>
      <div>
        <Form.Control
          type="date"
          placeholder="Normal text"
          name="date"
          defaultValue={new Date().toISOString().substring(0, 10)}
          onChange={dateHandler}
        />
      </div>

      <div className={style.documentation}>
        {loader && <Spiner />}
        {files &&
          files.map((file) => (
            <div className={style.btn} key={file._id}>
              <Item className={style.card} file={file} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Lessons;
