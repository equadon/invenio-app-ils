import { connect } from 'react-redux';
import { fetchPatronCurrentLoans } from '@state/PatronCurrentLoans/actions';
import PatronCurrentLoansComponent from './PatronCurrentLoans';

const mapStateToProps = state => ({
  ...state.patronCurrentLoans,
});

const mapDispatchToProps = dispatch => ({
  fetchPatronCurrentLoans: (patronPid, page, size) =>
    dispatch(fetchPatronCurrentLoans(patronPid, page, size)),
});

export const PatronCurrentLoans = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatronCurrentLoansComponent);
