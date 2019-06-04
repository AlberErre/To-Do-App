export const updateToDoHistoryList = (data) => {
  return dispatch => {
    dispatch({
      type: "UPDATE_TODO_HISTORY_LIST",
      historyData: data
    })
  };
}

export const addNoteToState = (note) => {
  return dispatch => {
    dispatch({
      type: "ADD_NOTE_TO_CURRENT_STATE",
      note
    })
  };
}

export const removeNoteFromState = (id) => {
  return dispatch => {
    dispatch({
      type: "REMOVE_NOTE_FROM_CURRENT_STATE",
      id
    })
  };
}

export const updateNoteFromState = (newNote) => {
  return dispatch => {
    dispatch({
      type: "UPDATE_NOTE_IN_CURRENT_STATE",
      newNote
    })
  };
}