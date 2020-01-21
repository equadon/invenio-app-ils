import { connect } from 'react-redux';
import { SeriesAbstract as SeriesAbstractComponent } from './SeriesAbstract';
import { SeriesAccessUrls as SeriesAccessUrlsComponent } from './SeriesAccessUrls';
import { SeriesAlternativeTitles as SeriesAlternativeTitlesComponent } from './SeriesAlternativeTitles';
import { SeriesIdentifiers as SeriesIdentifiersComponent } from './SeriesIdentifiers';
import { SeriesInfo as SeriesInfoComponent } from './SeriesInfo';
import { SeriesLiterature as SeriesLiteratureComponent } from './SeriesLiterature';
import { SeriesMetadataAccordion as SeriesMetadataAccordionComponent } from './SeriesMetadataAccordion';
import { SeriesMetadataTabs as SeriesMetadataTabsComponent } from './SeriesMetadataTabs';
import { SeriesTitle as SeriesTitleComponent } from './SeriesTitle';
import { SeriesTitlesTab as SeriesTitlesTabComponent } from './SeriesTitlesTab';
import { SeriesUrls as SeriesUrlsComponent } from './SeriesUrls';
export { SeriesCard } from './SeriesCard';

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

export const SeriesAccessUrls = connect(
  mapStateToProps,
  null
)(SeriesAccessUrlsComponent);

export const SeriesAlternativeTitles = connect(
  mapStateToProps,
  null
)(SeriesAlternativeTitlesComponent);

export const SeriesIdentifiers = connect(
  mapStateToProps,
  null
)(SeriesIdentifiersComponent);

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

export const SeriesTitle = connect(
  mapStateToProps,
  null
)(SeriesTitleComponent);

export const SeriesTitlesTab = connect(
  mapStateToProps,
  null
)(SeriesTitlesTabComponent);

export const SeriesUrls = connect(
  mapStateToProps,
  null
)(SeriesUrlsComponent);
