import { ADD_SHARE, REMOVE_SHARE } from "./shareTypes";

const INITIAL_STATE = {
  share: [],
};

const share = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SHARE:
      return {
        ...state,
        share: [...share, action.payload],
      };
    // return [...state, action.payload];
    case REMOVE_SHARE:
      return {
        ...state,
        share,
      };
    // return state.filter((cartItem) => cartItem.id !== action.payload.id);
    default:
      return state;
  }
};

export default share;
