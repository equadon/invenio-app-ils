import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ItemDetailsComponent from './ItemDetails';

const mapStateToProps = state => ({
  data: state.itemDetails.data,
  error: state.loansCard.error,
  isLoading: state.itemDetails.isLoading,
  hasError: state.itemDetails.hasError,
});

export const ItemDetails = compose(
  withRouter,
  connect(mapStateToProps)
)(ItemDetailsComponent);
