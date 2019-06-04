import React, { Component } from "react";
import Note from './Note';
import "../App.css";

class NotesContainer extends Component {

  render() {
    
    return (
      <div>
        {
          this.props.currentNotes.map( (note, i) => {
            return (
                <div key={i}> 
                  <Note
                    noteInfo={note}
                  />
                </div>
            );
          })
        }
      </div>
    );
  }
}

export default NotesContainer;