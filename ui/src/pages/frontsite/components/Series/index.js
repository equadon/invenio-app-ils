import { connect } from 'react-redux';
import { SeriesAbstract as SeriesAbstractComponent } from './SeriesAbstract';
import { SeriesAccessUrls as SeriesAccessUrlsComponent } from './SeriesAccessUrls';
import { SeriesAllTitles as SeriesAllTitlesComponent } from './SeriesAllTitles';
import { SeriesAlternativeTitles as SeriesAlternativeTitlesComponent } from './SeriesAlternativeTitles';
import {
  SeriesIdentifiers as SeriesIdentifiersComponent,
  SeriesIdentifierRows as SeriesIdentifierRowsComponent,
} from './SeriesIdentifiers';
import { SeriesInfo as SeriesInfoComponent } from './SeriesInfo';
import { SeriesMetadataAccordion as SeriesMetadataAccordionComponent } from './SeriesMetadataAccordion';
import { SeriesMetadataTabs as SeriesMetadataTabsComponent } from './SeriesMetadataTabs';
import { SeriesTitle as SeriesTitleComponent } from './SeriesTitle';
import { SeriesUrls as SeriesUrlsComponent } from './SeriesUrls';
export { SeriesLiteratureSearch } from './SeriesLiteratureSearch';
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

export const SeriesAllTitles = connect(
  mapStateToProps,
  null
)(SeriesAllTitlesComponent);

export const SeriesAlternativeTitles = connect(
  mapStateToProps,
  null
)(SeriesAlternativeTitlesComponent);

export const SeriesIdentifiers = connect(
  mapStateToProps,
  null
)(SeriesIdentifiersComponent);

export const SeriesIdentifierRows = connect(
  mapStateToProps,
  null
)(SeriesIdentifierRowsComponent);

export const SeriesInfo = connect(
  mapStateToProps,
  null
)(SeriesInfoComponent);

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

export const SeriesUrls = connect(
  mapStateToProps,
  null
)(SeriesUrlsComponent);
