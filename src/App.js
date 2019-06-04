import React, { Component } from 'react';
import firebase from 'firebase';
import { updateToDoHistoryList } from "./actions/toDoActions";
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
  }

  componentDidMount() {

    db.ref(toDoHistoryChannel).on("child_added", snapshot => {
      let data = snapshot.val();     
      this.props.toDoActions.updateToDoHistoryList(data.name, data.description, data.creationDate);
    });
  }
    
  render() {
    return (
      <div>     
      </div>
    );
  }
}

export default App;