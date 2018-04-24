import * as actions from './actions.js';

let _resolve;
let _reject;

export default function promptMiddleWare() {
  return store => next => action => {
    next(action);

    switch (action.type) {
      case actions.OPEN: {
        if (_resolve || _reject) {
          if (_reject) _reject();

          _resolve = null;
          _reject = null;
        }

        return new Promise((resolve, reject) => {
          _resolve = resolve;
          _reject = reject;
        });
      }

      case actions.SUBMIT: {
        if (_resolve) _resolve(action.data);

        _resolve = null;
        _reject = null;
        return null;
      }

      case actions.REJECT: {
        _reject({ message: 'the prompt was canceled by the user' });

        _resolve = null;
        _reject = null;
        return null;
      }

      default: {
        return null;
      }
    }
  };
}
