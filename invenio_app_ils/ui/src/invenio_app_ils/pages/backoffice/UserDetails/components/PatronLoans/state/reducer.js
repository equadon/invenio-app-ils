import {
  IS_LOADING,
  SUCCESS,
  HAS_ERROR,
  CHANGE_SORT_BY,
  CHANGE_SORT_ORDER,
} from './types';

export const initialState = {
  data: { hits: [], total: 0 },
  error: {},
  isLoading: true,
  hasError: false,
  sortBy: 'transaction_date',
  sortOrder: 'asc',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, isLoading: true };
    case SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        hasError: false,
      };
    case HAS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        hasError: true,
      };
    case CHANGE_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
        sortOrder: initialState.sortOrder,
      };
    case CHANGE_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload,
      };
    default:
      return state;
  }
};
