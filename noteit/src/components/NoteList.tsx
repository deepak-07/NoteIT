import React, { FC, FormEvent, useMemo, useRef, useState } from "react";
import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, NotesData, Tag } from "../App";
import { NoteCard } from "./NoteCard";

export type NotesListProps = {
  notesData: Note[];
  availableTags: Tag[];
};
export const NoteList: FC<NotesListProps> = ({ notesData, availableTags }) => {
  console.log("notes list data is ", availableTags);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  console.log(
    "%cNoteList.tsx line:16 selectedTags",
    "color: #007acc;",
    selectedTags
  );
  const filteredNotes = useMemo(() => {
    return notesData.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => {
            note.tags.some((noteTag) => noteTag.id == tag.id);
          }))
      );
    });
  }, [title, selectedTags, notesData]);
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              // onClick={() => setEditTagsModalIsOpen(true)}
              variant="outline-secondary"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags?.map((tag: Tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        <Col>
          {filteredNotes?.map((note) => {
            return (
              <NoteCard title={note?.title} tags={note?.tags} id={note.id} />
            );
          })}
        </Col>
      </Row>
    </>
  );
};
