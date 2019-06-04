const initialState = {};

const toDoReducer = (state = initialState, action) => {
  switch(action.type) {

    case 'UPDATE_TODO_HISTORY_LIST': 
      return { ...state, toDoHistoryList: [...state.toDoHistoryList, {
        action.historyData.name,
        action.historyData.description,
        action.historyData.creationDate,
      }]}

    default:
      return state
  }
};

export default toDoReducer;


