import { connect } from 'react-redux';
import { SeriesAbstract as SeriesAbstractComponent } from './SeriesAbstract';
import { SeriesTitle as SeriesTitleComponent } from './SeriesTitle';

const mapStateToProps = state => ({
  isLoading: state.seriesDetailsFront.isLoading,
  metadata: state.seriesDetailsFront.data.metadata,
  hasError: state.seriesDetailsFront.hasError,
  activeTab: state.seriesDetailsFront.activeTab,
});

export const SeriesAbstract = connect(
  mapStateToProps,
  null
)(SeriesAbstractComponent);

export const SeriesTitle = connect(
  mapStateToProps,
  null
)(SeriesTitleComponent);
