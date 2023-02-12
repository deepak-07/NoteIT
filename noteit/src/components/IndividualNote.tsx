import React from "react";
import { Badge, Row, Stack, Col, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { useNote } from "./NotesLayout";

type IndividualNoteProps = {
  onDelete: (id: string) => void;
};

export const IndividualNote = ({ onDelete }: IndividualNoteProps) => {
  const note = useNote();
  return (
    <>
      <Row className="align-items-center my-4">
        <Col>
          <Stack
            gap={1}
            className="align-items-center h-100 justify-content-center"
          >
            <span className="fs-5">{note.title}</span>
            {note.tags.length > 0 && (
              <Stack
                gap={1}
                direction="horizontal"
                className="justify-content-center"
              >
                {note.tags.map((tag) => {
                  return (
                    <h6>
                      <Badge key={tag.id} className={"text-truncate"} bg="dark">
                        {tag.label}
                      </Badge>
                    </h6>
                  );
                })}
              </Stack>
            )}
          </Stack>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button onClick={() => onDelete(note.id)} variant="outline-danger">
              Delete
            </Button>
            <Link to={`/`}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.body}</ReactMarkdown>
    </>
  );
};
