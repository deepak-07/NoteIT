import React, { useState } from "react";
import { Form, Stack, Row, Col } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";

const NoteForm = () => {
  const [value, setValue] = useState();
  const [options, setOptions] = useState([
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "berry", label: "Berry" },
  ]);
  return (
    <Form>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tagss</Form.Label>
              <CreatableReactSelect isMulti />
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
};

export default NoteForm;
