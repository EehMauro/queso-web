
const initialState = {
  isFetching: false,
  didInvalidate: false,
  forms: null,
  lastKey: null
};

export default function (state = initialState, action = {}) {

  switch (action.type) {

    case 'FORM_LIST_SUCCESS':
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        forms: action.forms,
        lastKey: action.lastKey
      };

    case 'FORM_LIST_FETCHING':
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
        forms: null,
        lastKey: null
      };

    case 'FORM_LIST_ERROR':
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
        forms: null,
        lastKey: null
      };

    default:
      return state;

  }

}
