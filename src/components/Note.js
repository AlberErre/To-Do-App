import React, { Component } from "react";
import TitleInput from './TitleInput';
import DescriptionInput from "./DescriptionInput";
import "../App.css";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      noteId: null,
      newName: null,
      newDescription: null
    };

    this.startEdit = this.startEdit.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  }

  startEdit(id) {
    this.setState({
      editMode: true,
      noteId: id
    });
  }

  finishEdit(event) {
    event.preventDefault();
    let newInfo = {
      name: event.target.elements.noteTitle.value,
      description: event.target.elements.noteText.value
    };

    this.props.updateNote(this.state.noteId, newInfo);
    this.setState({
      editMode: false,
      newName: newInfo.name,
      newDescription: newInfo.description
    });
  }

  render() {

    return (
      <div>
        {
          !this.state.editMode &&
          <div className="note">
            <div className="note-title">
              {(!this.state.newName) ? this.props.noteInfo.name : this.state.newName}
            </div>
            <div className="note-text">
              {(!this.state.newDescription) ? this.props.noteInfo.description : this.state.newDescription}
            </div>
            <span onClick={() => this.startEdit(this.props.noteInfo.id)} className="note-edit">
              edit
            </span>
            <span onClick={() => this.props.removeNote(this.props.noteInfo.id)} className="note-delete">
              ×
            </span>
          </div>
        }
        {
          this.state.editMode &&
          <div className="note">
            <form onSubmit={this.finishEdit}>
              <div className="note-title">
                <TitleInput
                  currentValue={this.props.noteInfo.name}
                />
              </div>
              <div className="note-text">
                <DescriptionInput
                  currentValue={this.props.noteInfo.description}
                />
              </div>
              <button className="note-edit">
                finish
              </button>
            </form>
          </div>
        }
      </div>
    );
  }
}

export default Note;