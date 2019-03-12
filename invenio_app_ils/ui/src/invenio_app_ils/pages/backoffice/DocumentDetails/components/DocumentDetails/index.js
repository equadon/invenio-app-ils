import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentDetailsComponent from './DocumentDetails';

const mapStateToProps = state => ({
  data: state.documentDetails.data,
  error: state.documentDetails.error,
  isLoading: state.documentDetails.isLoading,
  hasError: state.documentDetails.hasError,
});

export const DocumentDetails = compose(
  withRouter,
  connect(mapStateToProps)
)(DocumentDetailsComponent);
