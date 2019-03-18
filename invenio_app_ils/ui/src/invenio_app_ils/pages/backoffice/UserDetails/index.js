import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUserDetails } from './state/actions';
import UserDetailsContainerComponent from './UserDetailsContainer';
import { fetchPatronPendingLoans } from './components/PatronPendingLoans/state/actions';
import { fetchPatronCurrentLoans } from './components/PatronCurrentLoans/state/actions';

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: userPid => dispatch(fetchUserDetails(userPid)),
  fetchPatronPendingLoans: patronPid =>
    dispatch(fetchPatronPendingLoans(patronPid)),
  fetchPatronCurrentLoans: patronPid =>
    dispatch(fetchPatronCurrentLoans(patronPid)),
});

export const UserDetailsContainer = compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(UserDetailsContainerComponent);
