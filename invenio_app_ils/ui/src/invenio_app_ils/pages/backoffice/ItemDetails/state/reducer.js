import { IS_LOADING, SUCCESS, HAS_ERROR } from './types';
import createLoanReducer from '../components/ItemMetadata/components/CreateNewLoanModal/state/reducer';
import { initialState as newLoanCreateInitialState } from '../components/ItemMetadata/components/CreateNewLoanModal/state/reducer';

export const initialState = {
  data: { hits: [], total: 0 },
  error: {},
  isLoading: true,
  hasError: false,
  ...newLoanCreateInitialState,
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
    default:
      return createLoanReducer(state, action);
  }
};
