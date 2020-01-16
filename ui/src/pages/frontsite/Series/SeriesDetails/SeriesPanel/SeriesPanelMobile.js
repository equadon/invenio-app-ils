import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {
  ILSHeaderPlaceholder,
  ILSParagraphPlaceholder,
} from '@components/ILSPlaceholder';
import {
  SeriesAbstract,
  SeriesTitle,
} from '@pages/frontsite/components/Series';
import { SeriesAuthors } from '@components/Series';

export default class SeriesPanelMobile extends Component {
  render() {
    const { isLoading, series } = this.props;
    return (
      <>
        <div
          className="series-panel"
          data-test={series.metadata ? series.metadata.pid : 0}
        >
          <Grid>
            <Grid.Row>
              <Grid.Column mobile={16} textAlign="center">
                <ILSHeaderPlaceholder isLoading={isLoading} center="true">
                  <SeriesTitle />
                </ILSHeaderPlaceholder>
                <ILSParagraphPlaceholder linesNumber={1} isLoading={isLoading}>
                  <SeriesAuthors
                    prefix="by "
                    listItemAs="h4"
                    metadata={series.metadata}
                  />
                </ILSParagraphPlaceholder>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={16}>Series Circulation</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column mobile={16}>
                <ILSParagraphPlaceholder linesNumber={5} isLoading={isLoading}>
                  <Header as="h4" content="Abstract" />
                  <SeriesAbstract lines={5} />
                </ILSParagraphPlaceholder>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </>
    );
  }
}

SeriesPanelMobile.propTypes = {
  series: PropTypes.object.isRequired,
};
