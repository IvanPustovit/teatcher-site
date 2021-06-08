import React from "react";
import { Button, Form } from "react-bootstrap";

const UploadForm = ({
  onClick,
  onChange,
  label,
  typeName,
  onChangeFile,
  accept,
}) => {
  const startClick = (e) => {
    onClick(e);
  };

  const startChange = (e) => {
    onChange(e);
  };
  const startChangFile = (e) => {
    onChangeFile(e);
  };
  return (
    <>
      <Form.Group>
        <Form.File
          id="exampleFormControlFile1"
          onChange={startChangFile}
          required={true}
          accept={accept}
          size={5}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          onChange={startChange}
          name={typeName}
          required={true}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Відправити
      </Button>
    </>
  );
};

export default UploadForm;
