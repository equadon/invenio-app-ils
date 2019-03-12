import { IS_LOADING, SUCCESS, HAS_ERROR, RESET_STATE } from './types';

export const initialState = {
  newLoanCreate: { data: {}, error: {}, isLoading: false, hasError: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        newLoanCreate: {
          isLoading: true,
        },
      };
    case SUCCESS:
      return {
        ...state,
        newLoanCreate: {
          data: action.payload,
          isLoading: false,
          hasError: false,
        },
      };
    case HAS_ERROR:
      return {
        ...state,
        newLoanCreate: {
          error: action.payload,
          isLoading: false,
          hasError: true,
        },
      };
    case RESET_STATE:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
