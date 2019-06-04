import React from "react";
import TitleInput from './TitleInput';
import DescriptionInput from './DescriptionInput';
import ColorPicker from './ColorPicker';
import "../App.css";

const ToDoForm = (props) => {
  return (
    <form onSubmit={props.addNote}>
      <TitleInput />
      <DescriptionInput />
      <ColorPicker />
      <button>Add ToDo</button>
    </form>
  );
};

export default ToDoForm;
