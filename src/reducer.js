import * as actions from './actions.js';

export const initialState = null;

export default function propmptReducer(state = initialState, action) {
  switch (action.type) {
    case actions.OPEN:
      return action.content;

    case actions.REJECT:
    case actions.SUBMIT:
      return null;

    default:
      return state;
  }
}
