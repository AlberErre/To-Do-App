import React from "react";
import TitleInput from './TitleInput';
import DescriptionInput from './DescriptionInput';
import ColorPicker from './ColorPicker';
import "../App.css";

const ToDoForm = (props) => {
  return (
    <form onSubmit={props.addNote} className="toDoFormContainer">
      <TitleInput />
      <DescriptionInput />
      <div className="innerToDoFormContainer">
        <button className="addToDoButton">
          Add ToDo
        </button>
      </div>
    </form>
  );
};

export default ToDoForm;
