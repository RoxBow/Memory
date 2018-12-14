import { TEST } from './actions';

const initialState = {};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        test: action.test,
      };
    default:
      return state;
  }
};

export default testReducer;