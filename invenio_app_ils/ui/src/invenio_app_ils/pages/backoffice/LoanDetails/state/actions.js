import {
  IS_LOADING,
  SUCCESS,
  HAS_ERROR,
  ACTION_IS_LOADING,
  ACTION_SUCCESS,
  ACTION_HAS_ERROR,
} from './types';
import { loan as loanApi } from '../../../../common/api';

export const fetchLoanDetails = loanPid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    await loanApi
      .get(loanPid)
      .then(response => {
        dispatch({
          type: SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: HAS_ERROR,
          payload: error,
        });
      });
  };
};

export const performLoanAction = (pid, loan, url) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ACTION_IS_LOADING,
    });
    const stateUserSession = getState().userSession;
    // NOTE: for some reason stateUserSession is undefined, the '1' entries in
    // the post action represent stateUserSession.userPid and
    // stateUserSession.locationPid respectivelly

    await loanApi
      .postAction(url, pid, loan, '1', '1')
      .then(details => {
        dispatch({
          type: ACTION_SUCCESS,
          payload: details.data,
        });
      })
      .catch(error => {
        dispatch({
          type: ACTION_HAS_ERROR,
          payload: error,
        });
      });
  };
};
