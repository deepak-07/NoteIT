import React, { FC } from "react";
import { NotesData, Tag } from "../App";
import NoteForm from "./NoteForm";
import { useNote } from "./NotesLayout";

export type EditNotesProps = {
  onSubmit: (id: string, data: NotesData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export const EditNote: FC<EditNotesProps> = ({
  onSubmit,
  onAddTag,
  availableTags,
}) => {
  const note = useNote();
  return (
    <div>
      <h3 className="text-center my-3">Edit Draft</h3>
      {
        <NoteForm
          onSubmit={(data) => onSubmit(note.id, data)}
          onAddTag={onAddTag}
          availableTags={availableTags}
          title={note.title}
          body={note.body}
          tags={note.tags}
        />
      }
    </div>
  );
};
