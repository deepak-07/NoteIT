import React, { FC } from "react";
import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Note } from "../App";

export type NotesLayoutProps = {
  notesData: Note[];
};

const NotesLayout: FC<NotesLayoutProps> = ({ notesData }) => {
  const { id } = useParams();
  const note = notesData.find((n) => n.id === id);

  if (note == null) return <Navigate to="/" replace />;

  return <Outlet context={note} />;
};

export default NotesLayout;

export const useNote = () => {
  return useOutletContext<Note>();
};
