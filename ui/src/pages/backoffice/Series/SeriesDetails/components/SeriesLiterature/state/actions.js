import { IS_LOADING, SUCCESS, HAS_ERROR } from './types';
import { literature as literatureApi } from '@api';
import { sendErrorNotification } from '@components/Notifications';

export const fetchSeriesLiterature = (seriesPid, moi) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    await literatureApi
      .list(
        literatureApi
          .query()
          .includeAll()
          .withSeriesPid(seriesPid, moi)
          .qs()
      )
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
        dispatch(sendErrorNotification(error));
      });
  };
};
