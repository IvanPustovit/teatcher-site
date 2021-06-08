import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadFile,
  getFilesLessonFetch,
  updateFilesLessonFetch,
} from "../../redux/middleware/axios";
import { onLoader } from "../../redux/sliceReducer";
import Spiner from "../spiner/Spiner";
import style from "../../style/adminPanel/docPage.module.css";

const HomeWorkAdmin = () => {
  const dispatch = useDispatch();
  const classNumber = useSelector((state) => state.platform.classNumber);
  const files = useSelector((state) => state.platform.files);
  const loader = useSelector((state) => state.platform.loader);
  const [title, setTitle] = useState({
    dateLesson: Date.parse(new Date().toISOString().substring(0, 10)),
    classNumber,
  });

  const dateHandler = (e) => {
    setTitle({ ...title, dateLesson: e.target.valueAsNumber });
  };

  useEffect(() => {
    setTitle({ ...title, classNumber });
    dispatch(onLoader());
    dispatch(
      getFilesLessonFetch({
        title: {
          classNumber,
          dateLesson: title.dateLesson,
          typeDoc: "task",
        },
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
        </Form>
      </div>

      <div className={style.documentation}>
        {loader && <Spiner />}
        {files && (
          <Table hover striped bordered>
            <thead>
              <tr>
                <th>№п/п</th>
                <th>Назва роботи</th>
                <th>Назва файла</th>
                <th>ПІБ учня</th>
                <th></th>
                <th></th>
                <th>Статус д/р</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file._id}>
                  <td>{files.indexOf(file) + 1}</td>
                  <td>{file.title}</td>
                  <td>{file.name}</td>
                  <td>
                    {file.user.lastName} {file.user.name} {file.user.fatherName}
                  </td>
                  <td>
                    <Button onClick={() => downloadFile(file)}>
                      завантажити
                    </Button>
                  </td>
                  <td>
                    <Button
                      disabled={file.isDone}
                      onClick={() => dispatch(updateFilesLessonFetch(file))}
                    >
                      зараховано
                    </Button>
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
    </>
  );
};

export default HomeWorkAdmin;
