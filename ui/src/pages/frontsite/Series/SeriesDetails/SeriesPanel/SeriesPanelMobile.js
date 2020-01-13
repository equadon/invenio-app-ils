import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {
  ILSHeaderPlaceholder,
  ILSParagraphPlaceholder,
} from '@components/ILSPlaceholder';
import {
  SeriesAbstract,
  SeriesAccessUrls,
  SeriesTitle,
} from '@pages/frontsite/components/Series';
import { SeriesAuthors } from '@components/Series';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export default class SeriesPanelMobile extends Component {
  render() {
    const { isLoading, series } = this.props;
    const accessUrls = get(series, 'metadata.access_urls', []);
    return (
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
                  itemProps={{ as: 'h4' }}
                  metadata={series.metadata}
                />
              </ILSParagraphPlaceholder>
            </Grid.Column>
          </Grid.Row>
          {!isEmpty(accessUrls) && (
            <Grid.Row>
              <Grid.Column mobile={16}>
                <Segment className="highlighted">
                  <Header as="h3">Access online</Header>
                  <SeriesAccessUrls truncate />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column mobile={16}>
              <ILSParagraphPlaceholder linesNumber={5} isLoading={isLoading}>
                <Header as="h3" content="Abstract" />
                <SeriesAbstract lines={5} />
              </ILSParagraphPlaceholder>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

SeriesPanelMobile.propTypes = {
  series: PropTypes.object.isRequired,
};
