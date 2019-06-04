export const updateToDoHistoryList = (data) => {
  return dispatch => {
    dispatch({
      type: "UPDATE_TODO_HISTORY_LIST",
      historyData: data
    })
  };
}