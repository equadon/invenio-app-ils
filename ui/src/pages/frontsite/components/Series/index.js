import { connect } from 'react-redux';
import { SeriesAbstract as SeriesAbstractComponent } from './SeriesAbstract';
import { SeriesLiterature as SeriesLiteratureComponent } from './SeriesLiterature';
import { SeriesTitle as SeriesTitleComponent } from './SeriesTitle';
import { SeriesUrls as SeriesUrlsComponent } from './SeriesUrls';

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

export const SeriesLiterature = connect(
  mapStateToProps,
  null
)(SeriesLiteratureComponent);

export const SeriesTitle = connect(
  mapStateToProps,
  null
)(SeriesTitleComponent);

export const SeriesUrls = connect(
  mapStateToProps,
  null
)(SeriesUrlsComponent);
