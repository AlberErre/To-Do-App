import toDoReducer from '../src/reducers/toDoReducer';

const initialState = {
  currentNotes: [],
  toDoHistoryList: [],
  formOpened: false,
  historyModalOpened: false
};

const mockCreationDate = 'June 5th 2019, 5:13:13 pm';

const mockToDoNote = {
  id: '7b04f21e-57d3-40c6-bc28-1203ae5b1a76',
  name: 'shopping',
  description: 'milk, eggs and tomatoes',
  creationDate: mockCreationDate
};

const mockAddNoteAction = {
    type: "ADD_NOTE_TO_CURRENT_STATE",
    note: mockToDoNote
};

describe("Reducer should work as expected", () => {
    test("should ADD new note to ToDo's list (currentNotes)", () => {
        expect(toDoReducer(initialState, mockAddNoteAction)).toEqual({
          currentNotes: [{
            id: '7b04f21e-57d3-40c6-bc28-1203ae5b1a76',
            name: 'shopping',
            description: 'milk, eggs and tomatoes',
            creationDate: mockCreationDate
          }],
          toDoHistoryList: [],
          formOpened: false,
          historyModalOpened: false
        });
    });
});

const initialStateToEdit = {
  currentNotes: [{
    id: '7b04f21e-57d3-40c6-bc28-1203ae5b1a76',
    name: 'shopping',
    description: 'milk, eggs and tomatoes',
    creationDate: mockCreationDate
  }],
  toDoHistoryList: [],
  formOpened: false,
  historyModalOpened: false
};

const mockEditNoteAction = {
  type: "UPDATE_NOTE_IN_CURRENT_STATE",
  newNote: {
    id: '7b04f21e-57d3-40c6-bc28-1203ae5b1a76',
    name: 'shopping today',
    description: 'Orange juice, eggs and tomatoes',
    creationDate: mockCreationDate
  }
};

describe("Reducer should work as expected", () => {
  test("should UPDATE note information (shopping today, Orange juice)", () => {
      expect(toDoReducer(initialStateToEdit, mockEditNoteAction)).toEqual({
        currentNotes: [{
          id: '7b04f21e-57d3-40c6-bc28-1203ae5b1a76',
          name: 'shopping today',
          description: 'Orange juice, eggs and tomatoes',
          creationDate: mockCreationDate
        }],
        toDoHistoryList: [],
        formOpened: false,
        historyModalOpened: false
      });
  });
});

const mockRemoveNoteAction = {
  type: "REMOVE_NOTE_FROM_CURRENT_STATE",
  id: '7b04f21e-57d3-40c6-bc28-1203ae5b1a76'
};

describe("Reducer should work as expected", () => {
  test("should REMOVE previous note from ToDo's list by ID", () => {
      expect(toDoReducer(initialStateToEdit, mockRemoveNoteAction)).toEqual({
        currentNotes: [],
        toDoHistoryList: [],
        formOpened: false,
        historyModalOpened: false
      });
  });
});

const mockUpdateHistoryListAction = {
  type: "UPDATE_TODO_HISTORY_LIST",
  historyData: {
    id: '7b04f21e-57d3-40c6-bc28-1203ae5b1a76',
    name: 'shopping today',
    description: 'Orange juice, eggs and tomatoes',
    creationDate: mockCreationDate,
    action: 'ADD',
    firebaseKey: '-7be40ae5b1a76-'
  }
};

describe("Reducer should work as expected", () => {
  test("should UPDATE History List for new user action", () => {
      expect(toDoReducer(initialState, mockUpdateHistoryListAction)).toEqual({
        currentNotes: [],
        toDoHistoryList: [{
          id: '7b04f21e-57d3-40c6-bc28-1203ae5b1a76',
          name: 'shopping today',
          description: 'Orange juice, eggs and tomatoes',
          creationDate: mockCreationDate,
          action: 'ADD',
          firebaseKey: '-7be40ae5b1a76-'
        }],
        formOpened: false,
        historyModalOpened: false
      });
  });
});

const initialStateToHistoryClear = {
  currentNotes: [],
  toDoHistoryList: [{
    id: '7b04f21e-57d3-40c6-bc28-1203ae5b1a76',
    name: 'shopping today',
    description: 'Orange juice, eggs and tomatoes',
    creationDate: mockCreationDate,
    action: 'ADD',
    firebaseKey: '-7be40ae5b1a76-'
  }],
  formOpened: false,
  historyModalOpened: false
};

const mockClearHistoryListAction = {
  type: "CLEAR_TODO_HISTORY_LIST"
};

describe("Reducer should work as expected", () => {
  test("should CLEAR History List", () => {
      expect(toDoReducer(initialStateToHistoryClear, mockClearHistoryListAction)).toEqual({
        currentNotes: [],
        toDoHistoryList: [],
        formOpened: false,
        historyModalOpened: false
      });
  });
});

const mockToggleFormAction = {
  type: "TOGGLE_TODO_FORM"
};

describe("Reducer should work as expected", () => {
  test("should OPEN To Do's form, formOpened: true", () => {
      expect(toDoReducer(initialState, mockToggleFormAction)).toEqual({
        currentNotes: [],
        toDoHistoryList: [],
        formOpened: true,
        historyModalOpened: false
      });
  });
});

const mockToggleModalAction = {
  type: "TOGGLE_HISTORY_MODAL"
};

describe("Reducer should work as expected", () => {
  test("should OPEN History modal, historyModalOpened: true", () => {
      expect(toDoReducer(initialState, mockToggleModalAction)).toEqual({
        currentNotes: [],
        toDoHistoryList: [],
        formOpened: false,
        historyModalOpened: true
      });
  });
});
