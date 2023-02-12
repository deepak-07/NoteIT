import React, { FC, FormEvent, useRef, useState } from "react";
import { Form, Stack, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import "../Note.css";

export type NotesCardProps = {
  title: string;
  tags: Tag[];
  id: string;
};
export const NoteCard: FC<NotesCardProps> = ({ title, tags, id }) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={"h-100 text-reset text-decoration-none note-card"}
    >
      <Card.Body>
        <Stack
          gap={1}
          className="align-items-center h-100 justify-content-center"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center"
            >
              {tags.map((tag) => {
                return (
                  <Badge key={tag.id} className={"text-truncate"}>
                    {tag.label}
                  </Badge>
                );
              })}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};
