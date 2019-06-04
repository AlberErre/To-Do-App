const initialState = {
  currentNotes: [],
  toDoHistoryList: [],
};

const toDoReducer = (state = initialState, action) => {
  switch(action.type) {

    case 'ADD_NOTE_TO_CURRENT_STATE':
      return { ...state, currentNotes: [...state.currentNotes, {
        id: action.note.id,
        name: action.note.name,
        description: action.note.description,
        creationDate: action.note.creationDate,
      }]}

    case 'UPDATE_TODO_HISTORY_LIST':
      return { ...state, toDoHistoryList: [...state.toDoHistoryList, {
        name: action.historyData.name,
        description: action.historyData.description,
        creationDate: action.historyData.creationDate,
      }]}

    default:
      return state
  }
};

export default toDoReducer;


