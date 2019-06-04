import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import firebase from 'firebase';
import { firebaseConfig, toDoHistoryChannel } from './firebaseConfig';
import { updateToDoHistoryList, addNoteToState, removeNoteFromState, updateNoteFromState } from "./actions/toDoActions";
import ToDoForm from './components/ToDoForm';
import NotesContainer from './components/NotesContainer';
import HistoryList from './components/HistoryList';
import {v1 as uuid} from 'uuid';
import "./App.css";

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

class App extends Component {
  constructor(props) {
    super(props)

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  componentDidMount() {

    db.ref(toDoHistoryChannel).on("child_added", snapshot => {
      let data = snapshot.val();
      this.props.toDoActions.updateToDoHistoryList(data);
    });
  }

  addNote(event) {
    event.preventDefault();

    let noteData = event.target.elements;

    if (noteData.noteText.value || noteData.noteTitle.value) {
      let note = {
        id: uuid(),
        name: noteData.noteTitle.value,
        description: noteData.noteText.value,
        creationDate: Date.now()
      };

      this.props.toDoActions.addNoteToState(note);
      db.ref(toDoHistoryChannel).push(
        Object.assign(note, { action: "ADD"})
      );
      noteData.noteTitle.value = '';
      noteData.noteText.value = '';
    }
  };

  removeNote(id) {
    this.props.currentNotes.forEach( note => {
      if (note.id === id) {
        db.ref(toDoHistoryChannel).push(
          Object.assign(note, { action: "REMOVE"})
        );
      }
    });

    this.props.toDoActions.removeNoteFromState(id);
  };

  updateNote(id, newInfo) {
    this.props.currentNotes.forEach( note => {
      if (note.id === id) {
        let newNote = Object.assign(note, {
          name: newInfo.name,
          description: newInfo.description
        });
        this.props.toDoActions.updateNoteFromState(newNote);
        db.ref(toDoHistoryChannel).push(
          Object.assign(newNote, { action: "EDIT"})
        );
      }
    });
  };

  render() {
    return (
      <div>
        <ToDoForm
          addNote={this.addNote}
        />
        <NotesContainer
          currentNotes={this.props.currentNotes}
          removeNote={this.removeNote}
          updateNote={this.updateNote}
        />
        <HistoryList />
      </div>
    );
  }
}

const mapSateToProps = state => ({
  currentNotes: state.currentNotes,
  toDoHistoryList: state.toDoHistoryList
});

const mapDispatchToProps = (dispatch) => ({
  toDoActions: bindActionCreators({
    updateToDoHistoryList,
    addNoteToState,
    removeNoteFromState,
    updateNoteFromState
  }, dispatch)
});

export default connect(mapSateToProps, mapDispatchToProps)(App);