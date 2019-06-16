import React, { Component } from "react";
import Note from './Note';
import { Text } from '@aragon/ui'
import "../App.css";

class NotesContainer extends Component {

  render() {

    return (
      <div className="notesContainer">
        {
          this.props.currentNotes &&
          this.props.currentNotes.map( (note, i) => {
            return (
                <React.Fragment key={i}>
                  <Note
                    noteInfo={note}
                    removeNote={this.props.removeNote}
                    updateNote={this.props.updateNote}
                  />
                </React.Fragment>
            );
          })
        }
        {
          this.props.currentNotes.length === 0 &&
          <div className="emptyNotesContainer">
            <Text>Ups, looks like there are no To Do's yet..</Text>
            <Text>Try adding one!</Text>
          </div>
        }
      </div>
    );
  }
}

export default NotesContainer;