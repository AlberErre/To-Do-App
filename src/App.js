import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import firebase from 'firebase';
import { updateToDoHistoryList, addNoteToState, removeNoteFromState } from "./actions/toDoActions";
import ToDoForm from './components/ToDoForm';
import NotesContainer from './components/NotesContainer';
import HistoryList from './components/HistoryList';
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyBP9ZLy0_FBCPozb_gxV0H70Efx-P_SEqg",
  authDomain: "to-do-app-1a886.firebaseapp.com",
  databaseURL: "https://to-do-app-1a886.firebaseio.com",
  projectId: "to-do-app-1a886",
  storageBucket: "to-do-app-1a886.appspot.com",
  messagingSenderId: "846775201712",
  appId: "1:846775201712:web:1ff06fa7c97acd63"
};

const toDoHistoryChannel = "toDoHistory_channel_01";
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

class App extends Component {
  constructor(props) {
    super(props)

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
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
        id: Math.random(),
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

  render() {
    return (
      <div>
        <ToDoForm
          addNote={this.addNote}
        />
        <NotesContainer
          currentNotes={this.props.currentNotes}
          removeNote={this.removeNote}
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
    removeNoteFromState
  }, dispatch)
});

export default connect(mapSateToProps, mapDispatchToProps)(App);