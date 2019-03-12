import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserDetailsComponent from './UserDetails';

const mapStateToProps = state => ({
  data: state.userDetails.data,
  error: state.userDetails.error,
  isLoading: state.userDetails.isLoading,
  hasError: state.userDetails.hasError,
});

export const UserDetails = compose(
  withRouter,
  connect(mapStateToProps)
)(UserDetailsComponent);
