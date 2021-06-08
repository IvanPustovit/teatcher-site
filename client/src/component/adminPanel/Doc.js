import React, { useEffect, useState } from "react";
import Spiner from "../spiner/Spiner";

import style from "../../style/adminPanel/docPage.module.css";
import { Form, Table, Button } from "react-bootstrap";
import {
  deleteFileFetch,
  getFilesFetch,
  uploadFileFetch,
  downloadFile,
} from "../../redux/middleware/axios";
import { useDispatch, useSelector } from "react-redux";
import { onLoader } from "../../redux/sliceReducer";
import UploadForm from "../forms/UploadForm";

const Doc = () => {
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
    dispatch(getFilesFetch("regulatory"));
  }, []);

  return (
    <>
      {loader && <Spiner />}
      <div>
        <div className={style.documentation}>
          {files && (
            <Table hover bordered>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Назва інструкції</th>
                  <th>Назва файла</th>

                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file._id}>
                    <td>{files.indexOf(file) + 1}</td>
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
        <div>
          <Form id="form-doc">
            <UploadForm
              onClick={uploadDoc}
              onChange={addTitle}
              label="Напишіть назву документа"
              typeName="regulatory"
              onChangeFile={createFile}
              accept="application/msword, application/pdf"
            />
          </Form>
        </div>
      </div>
    </>
  );
};

export default Doc;
