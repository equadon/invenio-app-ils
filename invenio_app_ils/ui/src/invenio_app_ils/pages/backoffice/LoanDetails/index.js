import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchLoanDetails } from './state/actions';
import LoanDetailsContainerComponent from './LoanDetailsContainer';
import { fetchAvailableItems } from './components/AvailableItems/state/actions';

const mapDispatchToProps = dispatch => ({
  fetchLoanDetails: loanPid => dispatch(fetchLoanDetails(loanPid)),
  fetchAvailableItems: loanPid => dispatch(fetchAvailableItems(loanPid)),
});

export const LoanDetailsContainer = compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(LoanDetailsContainerComponent);
