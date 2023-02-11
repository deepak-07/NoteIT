import React, { useMemo } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { NewNote } from "./components/NewNote";
import { useLocalStorageHook } from "./components/hooks/useLocalStorageHook";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./components/NoteList";
import NotesLayout from "./components/NotesLayout";
import { IndividualNote } from "./components/IndividualNote";

export type RawNote = {
  id: string;
} & RawNotesData;

export type RawNotesData = {
  title: string;
  tagIds: string[];
  body: string;
};

export type Note = {
  id: string;
} & NotesData;

export type NotesData = {
  title: string;
  tags: Tag[];
  body: string;
};
export type Tag = {
  id: string;
  label: string;
};

function App() {
  const [notesData, setNotesData] = useLocalStorageHook<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorageHook<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notesData.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notesData, tags]);

  const onCreateNote = ({ tags, ...data }: NotesData) => {
    setNotesData((prevNotes: NotesData[]) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };
  const addTag = (tag: Tag) => {
    setTags((prev: Tag[]) => [...prev, tag]);
  };
  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={<NoteList notesData={notesWithTags} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NotesLayout notesData={notesWithTags} />}>
          <Route index element={<IndividualNote />} />
          {/* <Route path="/edit" element={<h1>Edit</h1>} /> */}
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
