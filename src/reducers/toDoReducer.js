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

    case 'REMOVE_NOTE_FROM_CURRENT_STATE':
      return { ...state, currentNotes: state.currentNotes.filter(note => note.id !== action.id) }

    case 'UPDATE_NOTE_IN_CURRENT_STATE':
      return { ...state, currentNotes: state.currentNotes.map( note => {
        if (note.id === action.newNote.id) {
          note.name = action.newNote.name
          note.description = action.newNote.description
        }
        return note
      })}

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


