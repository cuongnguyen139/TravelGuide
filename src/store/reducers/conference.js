const initialState = {
  conferenceNumbers: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        conferenceNumbers: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
