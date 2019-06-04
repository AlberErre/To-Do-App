import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import firebase from 'firebase';
import { updateToDoHistoryList } from "./actions/toDoActions";
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
  }

  componentDidMount() {

    db.ref(toDoHistoryChannel).on("child_added", snapshot => {
      let data = snapshot.val();     
      this.props.toDoActions.updateToDoHistoryList(data);
    });
  }
    
  render() {
    return (
      <div>
        <ToDoForm/>
        <NotesContainer />
        <HistoryList />
      </div>
    );
  }
}

const mapSateToProps = state => ({
  toDoHistoryList: state.toDoHistoryList
});

const mapDispatchToProps = (dispatch) => ({
  chatActions: bindActionCreators({
    updateToDoHistoryList
  }, dispatch)
});

export default connect(mapSateToProps, mapDispatchToProps)(App);