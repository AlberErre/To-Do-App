import React, { Component } from "react";
import "../App.css";

const Note = (props) => {
  return (
    <div className="note">
      <div className="note-title">
        {props.noteInfo.name}
      </div>
      <div className="note-text">
        {props.noteInfo.description}
      </div>
      <span className="note-edit">
        edit
      </span>
      <span className="note-delete">
        ×
      </span>
    </div>
  );
};

export default Note;