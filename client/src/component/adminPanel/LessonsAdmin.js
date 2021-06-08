import React, { useEffect, useState } from "react";
import { Form, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilesLessonFetch,
  uploadFileLessonFetch,
  downloadFile,
  deleteFileFetch,
} from "../../redux/middleware/axios";
import { onLoader } from "../../redux/sliceReducer";
import UploadForm from "../forms/UploadForm";
import Spiner from "../spiner/Spiner";
import style from "../../style/adminPanel/docPage.module.css";

const LessonsAdmin = () => {
  const dispatch = useDispatch();
  const classNumber = useSelector((state) => state.platform.classNumber);
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);
  const [title, setTitle] = useState({
    dateLesson: Date.parse(new Date().toISOString().substring(0, 10)),
    classNumber,
  });
  const [fileUpload, setFileUpload] = useState({});
  // console.log(Date.parse(new Date().toISOString().substring(0, 10)));
  const createFile = (e) => {
    const file = e.target.files[0];
    setFileUpload(file);
  };
  const dateHandler = (e) => {
    setTitle({ ...title, dateLesson: e.target.valueAsNumber });
  };
  const addTitle = (e) => {
    const titleValue = e.target.value;
    setTitle({ ...title, titleValue, typeDoc: e.target.name });
  };

  const uploadDoc = (e) => {
    e.preventDefault();
    dispatch(uploadFileLessonFetch({ fileUpload, title }));
    const form = document.getElementById("form-doc");
    form.reset();
    dispatch(
      getFilesLessonFetch({
        title: { classNumber, dateLesson: title.dateLesson, typeDoc: "lesson" },
      })
    );
    setTitle({
      dateLesson: Date.parse(new Date().toISOString().substring(0, 10)),
      classNumber,
    });
  };

  useEffect(() => {
    setTitle({ ...title, classNumber });
    dispatch(onLoader());
    dispatch(
      getFilesLessonFetch({
        title: { classNumber, dateLesson: title.dateLesson, typeDoc: "lesson" },
      })
    );
  }, [classNumber, title.dateLesson]);
  return (
    <>
      <div>
        <Form id="form-doc">
          <Form.Control
            type="date"
            placeholder="Normal text"
            name="date"
            defaultValue={new Date().toISOString().substring(0, 10)}
            onChange={dateHandler}
          />
          <br />
          <UploadForm
            typeName="lesson"
            onChangeFile={createFile}
            onChange={addTitle}
            onClick={uploadDoc}
            accept="application/msword, application/pdf"
          />
        </Form>
      </div>

      <div className={style.documentation}>
        {loader && <Spiner />}
        {files && (
          <Table hover bordered>
            <thead>
              <tr>
                <th>№</th>
                <th>Дата</th>
                <th>Назва урока</th>
                <th>Назва файла</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file._id}>
                  <td>{files.indexOf(file) + 1}</td>
                  <td>
                    {file.dateLesson &&
                      new Date(Number(file.dateLesson))
                        .toISOString()
                        .substring(0, 10)}
                  </td>
                  <td>{file.title}</td>
                  <td>{file.name}</td>

                  <td>
                    <Button onClick={() => downloadFile(file)}>
                      Завантажити
                    </Button>
                  </td>
                  <td>
                    <Button
                      disabled={file.isDone}
                      onClick={() => dispatch(deleteFileFetch(file))}
                    >
                      Видалити
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default LessonsAdmin;
