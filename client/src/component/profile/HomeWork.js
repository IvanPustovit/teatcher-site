import React, { useEffect, useState } from "react";
import { Form, Table, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilesLessonFetch,
  uploadFileLessonFetch,
  getFilesHomeworkFetch,
  downloadFile,
  deleteFileFetch,
} from "../../redux/middleware/axios";
import { onLoader } from "../../redux/sliceReducer";
import ButtonFunc from "../ButtonFunc";
import UploadForm from "../forms/UploadForm";
import Spiner from "../spiner/Spiner";
import style from "../../style/adminPanel/docPage.module.css";
import Item from "../documentation/Item";

const HomeWork = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state.platform.user.currentUser.user
  );
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);
  const [title, setTitle] = useState({
    dateLesson: Date.parse(new Date().toISOString().substring(0, 10)),
    classNumber: user.classNumber,
    typeDoc: "task",
  });
  const [fileUpload, setFileUpload] = useState({});
  const createFile = (e) => {
    const file = e.target.files[0];
    setFileUpload(file);
  };
  const dateHandler = (e) => {
    setTitle({ ...title, dateLesson: e.target.valueAsNumber });
  };
  const addTitle = (e) => {
    console.log(e.target.name);
    const titleValue = e.target.value;
    setTitle({ ...title, titleValue, typeDoc: e.target.name });
  };

  const uploadDoc = (e) => {
    e.preventDefault();
    dispatch(uploadFileLessonFetch({ fileUpload, title }));
    const form = document.getElementById("form-doc");
    form.reset();
    dispatch(
      getFilesHomeworkFetch({
        dateLesson: title.dateLesson,
        typeDoc: "task",
        user: user._id,
      })
    );
  };

  useEffect(() => {
    dispatch(onLoader());
    dispatch(
      getFilesHomeworkFetch({
        dateLesson: title.dateLesson,
        typeDoc: "task",
        user: user._id,
      })
    );
  }, [title.dateLesson]);
  return (
    <>
      <div className={style.documentation}>
        {loader && <Spiner />}
        {files && (
          <Table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Назва роботи</th>
                <th>Назва файла</th>
                <th></th>
                <th></th>
                <th>Статус д/р</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file._id}>
                  <td>
                    {new Date(Number(file.dateLesson))
                      .toISOString()
                      .substring(0, 10)}
                  </td>
                  <td>{file.title}</td>
                  <td>{file.name}</td>

                  <td>
                    <Button onClick={() => downloadFile(file)}>
                      завантажити
                    </Button>
                  </td>
                  <td>
                    {currentUser._id === user._id && (
                      <Button
                        disabled={file.isDone}
                        onClick={() => dispatch(deleteFileFetch(file))}
                      >
                        видалити
                      </Button>
                    )}
                  </td>
                  <td>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      checked={file.isDone}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      {currentUser._id === user._id && (
        <div>
          <Form id="form-doc" onSubmit={uploadDoc}>
            <Form.Control
              type="date"
              placeholder="Normal text"
              name="date"
              defaultValue={new Date().toISOString().substring(0, 10)}
              onChange={dateHandler}
            />
            <br />
            <UploadForm
              typeName="task"
              onChangeFile={createFile}
              onChange={addTitle}
              onClick={uploadDoc}
              accept="application/msword, application/pdf"
            />
          </Form>
        </div>
      )}
    </>
  );
};

export default HomeWork;
