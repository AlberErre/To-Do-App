import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import firebase from 'firebase';
import { firebaseConfig, toDoHistoryChannel } from './firebaseConfig';
import { updateToDoHistoryList, addNoteToState, removeNoteFromState, updateNoteFromState,
        clearToDoList, toggleToDoForm, toggleHistoryModal} from "./actions/toDoActions";
import ToDoForm from './components/ToDoForm';
import NotesContainer from './components/NotesContainer';
import HistoryList from './components/HistoryList';
import {v1 as uuid} from 'uuid';
import { Button, AppBar, SidePanel, Modal } from '@aragon/ui';
import moment from 'moment';
import "./App.css";

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

class App extends Component {
  constructor(props) {
    super(props)

    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.clearFirebaseHistory = this.clearFirebaseHistory.bind(this);
  }

  componentDidMount() {

    db.ref(toDoHistoryChannel).on("child_added", snapshot => {
      let data = snapshot.val();
      Object.assign(data, { firebaseKey: snapshot.key });
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
        creationDate: moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
      };

      this.props.toDoActions.addNoteToState(note);
      db.ref(toDoHistoryChannel).push(
        Object.assign(note, { action: "ADD"})
      );
      noteData.noteTitle.value = '';
      noteData.noteText.value = '';

      this.props.toDoActions.toggleToDoForm();
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

  clearFirebaseHistory() {
    this.props.toDoHistoryList.forEach( note => {
      db.ref(toDoHistoryChannel).child(note.firebaseKey).remove();
    });
    this.props.toDoActions.clearToDoList();
  }

  render() {
    return (
      <React.Fragment>
        <AppBar title="To Do App"
          endContent={<Button mode="strong" onClick={() => this.props.toDoActions.toggleToDoForm()}>
                        Add To Do
                      </Button>}>
          <Button mode="outline" onClick={() => this.props.toDoActions.toggleHistoryModal()}> History data </Button>
        </AppBar>

        <SidePanel title="New To Do" opened={this.props.formOpened} onClose={() => this.props.toDoActions.toggleToDoForm()}>
        {
          <ToDoForm
            addNote={this.addNote}
          />
        }
        </SidePanel>

        <NotesContainer
          currentNotes={this.props.currentNotes}
          removeNote={this.removeNote}
          updateNote={this.updateNote}
        />

        <Modal
          visible={this.props.historyModalOpened}
          width={viewport => Math.min(viewport.width - 50)}
          onClose={() => this.props.toDoActions.toggleHistoryModal()}>
          {
            <HistoryList
              toDoHistoryList={this.props.toDoHistoryList}
              toggleHistoryModal={this.props.toDoActions.toggleHistoryModal}
              clearFirebaseHistory={this.clearFirebaseHistory}
            />
          }
        </Modal>
      </React.Fragment>
    );
  }
}

const mapSateToProps = state => ({
  currentNotes: state.currentNotes,
  toDoHistoryList: state.toDoHistoryList,
  formOpened: state.formOpened,
  historyModalOpened: state.historyModalOpened
});

const mapDispatchToProps = (dispatch) => ({
  toDoActions: bindActionCreators({
    updateToDoHistoryList,
    clearToDoList,
    addNoteToState,
    removeNoteFromState,
    updateNoteFromState,
    toggleToDoForm,
    toggleHistoryModal
  }, dispatch)
});

export default connect(mapSateToProps, mapDispatchToProps)(App);