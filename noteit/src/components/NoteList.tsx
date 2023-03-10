import { FC, useMemo, useState } from "react";
import { Form, Stack, Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../App";
import { NoteCard } from "./NoteCard";
import "../Note.css";

export type NotesListProps = {
  notesData: Note[];
  availableTags: Tag[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};
export const NoteList: FC<NotesListProps> = ({
  notesData,
  availableTags,
  updateTag,
  deleteTag,
}) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState<boolean>(
    false
  );
  const filteredNotes = useMemo(() => {
    return notesData.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) => {
            return note.tags.some((noteTag) => noteTag.id == tag.id);
          }))
      );
    });
  }, [title, selectedTags, notesData]);
  return (
    <>
      <Row className="align-items-center my-4">
        <Col>
          <h1>My Drafts</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="btn btn-dark">Create</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant="btn btn-light"
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
                placeholder={"Search title.."}
                onChange={(e) => setTitle(e.target.value)}
                className="note-fields"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                className="note-fields"
                classNames={{
                  control: (state) => "note-fields",
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: "#674188",
                  },
                })}
                placeholder={"Filter tags"}
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
      <Row xs={1} sm={2} lg={3} xl={4} className="">
        {notesData.length == 0 ? (
          <Row className="w-100">
            <div className="text-center my-3 font-weight-bold">
              Create your 1st draft
            </div>
          </Row>
        ) : filteredNotes?.length > 0 ? (
          filteredNotes?.map((note) => {
            return (
              <Col key={note.id} className="my-3">
                <NoteCard title={note?.title} tags={note?.tags} id={note.id} />
              </Col>
            );
          })
        ) : (
          <Row className="w-100">
            <div className="text-center my-3 font-weight-bold">
              Ahh.. Nothing to show
            </div>
          </Row>
        )}
      </Row>

      <EditModalTags
        availableTags={availableTags}
        editTagsModalIsOpen={editTagsModalIsOpen}
        setEditTagsModalIsOpen={setEditTagsModalIsOpen}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </>
  );
};
type EditModalTagsProps = {
  availableTags: Tag[];
  editTagsModalIsOpen: boolean;
  setEditTagsModalIsOpen: (val: boolean) => void;
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
};

export const EditModalTags = ({
  availableTags,
  editTagsModalIsOpen,
  setEditTagsModalIsOpen,
  updateTag,
  deleteTag,
}: EditModalTagsProps) => {
  return (
    <>
      <Modal
        show={editTagsModalIsOpen}
        onHide={() => setEditTagsModalIsOpen(false)}
      >
        <Modal.Header className="edit-modal" closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-modal ">
          <Stack gap={2}>
            {availableTags.length > 0 ? (
              availableTags.map((tag) => {
                return (
                  <Row key={tag.id}>
                    <Col>
                      <Form.Control
                        type="text"
                        value={tag.label}
                        className="note-fields-tag"
                        onChange={(e) => {
                          updateTag(tag.id, e.target.value);
                        }}
                      />
                    </Col>
                    <Col xs="auto">
                      <Button
                        type="button"
                        variant="outline-danger"
                        onClick={() => deleteTag(tag.id)}
                      >
                        &times;
                      </Button>
                    </Col>
                  </Row>
                );
              })
            ) : (
              <p>No tags avaialble</p>
            )}
          </Stack>
          <Stack>
            <Row></Row>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
};
