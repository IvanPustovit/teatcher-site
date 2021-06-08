import React from "react";
import { Form } from "react-bootstrap";

const PosterForm = ({ label, value }) => {
  return (
    <div>
      <Form.Group controlId="exampleForm.ControlTextarea1" id="postForm">
        <Form.Label>{label}</Form.Label>
        <Form.Control as="textarea" rows={3} value={value} />
      </Form.Group>
    </div>
  );
};

export default PosterForm;
