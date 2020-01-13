import { connect } from 'react-redux';
import { fetchSeriesLiterature } from './state/actions';
import SeriesLiteratureComponent from './SeriesLiterature';

const mapStateToProps = state => ({
  seriesLiterature: state.seriesLiterature.data,
  error: state.seriesLiterature.error,
  isLoading: state.seriesLiterature.isLoading,
  seriesDetails: state.seriesDetails.data,
});

const mapDispatchToProps = dispatch => ({
  fetchSeriesLiterature: (seriesPid, moi) =>
    dispatch(fetchSeriesLiterature(seriesPid, moi)),
});

export const SeriesLiterature = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesLiteratureComponent);
