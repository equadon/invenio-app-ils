import { connect } from 'react-redux';
import { Notifications as _Notifications } from './Notifications';
import { REMOVE } from './state/types';
export {
  addNotification,
  sendErrorNotification,
  sendSuccessNotification,
} from './state/actions';
export { default as notificationsReducer } from './state/reducer';

const mapStateToProps = state => ({
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = dispatch => ({
  removeNotification: notificationId =>
    dispatch({
      type: REMOVE,
      payload: notificationId,
    }),
});

export const Notifications = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Notifications);
