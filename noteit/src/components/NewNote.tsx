import React, { FC } from "react";
import { NotesData, Tag } from "../App";
import NoteForm from "./NoteForm";

export type NewNotesProps = {
  onSubmit: (data: NotesData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export const NewNote: FC<NewNotesProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
}) => {
  return (
    <div>
      <h3 className="text-center my-3">New Draft</h3>
      {
        <NoteForm
          onSubmit={onSubmit}
          onAddTag={onAddTag}
          availableTags={availableTags}
        />
      }
    </div>
  );
};
