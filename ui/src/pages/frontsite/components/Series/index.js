import { connect } from 'react-redux';
import { SeriesAbstract as SeriesAbstractComponent } from './SeriesAbstract';
import { SeriesContent as SeriesContentComponent } from './SeriesContent';
import { SeriesInfo as SeriesInfoComponent } from './SeriesInfo';
import { SeriesLiterature as SeriesLiteratureComponent } from './SeriesLiterature';
import { SeriesMetadataAccordion as SeriesMetadataAccordionComponent } from './SeriesMetadataAccordion';
import { SeriesStats as SeriesStatsComponent } from './SeriesStats';
import { SeriesMetadataTabs as SeriesMetadataTabsComponent } from './SeriesMetadataTabs';
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

export const SeriesContent = connect(
  mapStateToProps,
  null
)(SeriesContentComponent);

export const SeriesInfo = connect(
  mapStateToProps,
  null
)(SeriesInfoComponent);

export const SeriesLiterature = connect(
  mapStateToProps,
  null
)(SeriesLiteratureComponent);

export const SeriesMetadataAccordion = connect(
  mapStateToProps,
  null
)(SeriesMetadataAccordionComponent);

export const SeriesMetadataTabs = connect(
  mapStateToProps,
  null
)(SeriesMetadataTabsComponent);

export const SeriesStats = connect(
  mapStateToProps,
  null
)(SeriesStatsComponent);

export const SeriesTitle = connect(
  mapStateToProps,
  null
)(SeriesTitleComponent);

export const SeriesUrls = connect(
  mapStateToProps,
  null
)(SeriesUrlsComponent);
