import React, { Component } from 'react';
import { Grid, Responsive, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {
  ILSHeaderPlaceholder,
  ILSParagraphPlaceholder,
} from '@components/ILSPlaceholder';
import {
  SeriesAbstract,
  SeriesTitle,
  SeriesUrls,
} from '@pages/frontsite/components/Series';
import { SeriesPanelMobile } from './index';
import { SeriesAuthors } from '@components/Series';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

export default class SeriesPanel extends Component {
  render() {
    const { isLoading, series } = this.props;
    const urls = get(series, 'metadata.urls', []);
    const accessUrls = get(series, 'metadata.access_urls', []);
    return (
      <>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <div
            className="series-panel"
            data-test={series.metadata ? series.metadata.pid : 0}
          >
            <Grid>
              <Grid.Row>
                <Grid.Column width={11}>
                  <ILSHeaderPlaceholder isLoading={isLoading}>
                    <SeriesTitle />
                  </ILSHeaderPlaceholder>
                  <ILSParagraphPlaceholder
                    linesNumber={1}
                    isLoading={isLoading}
                  >
                    <SeriesAuthors
                      prefix="by "
                      itemProps={{ as: 'h4' }}
                      metadata={series.metadata}
                    />
                  </ILSParagraphPlaceholder>
                  <ILSParagraphPlaceholder
                    linesNumber={20}
                    isLoading={isLoading}
                  >
                    <SeriesAbstract lines={20} />
                  </ILSParagraphPlaceholder>
                </Grid.Column>
                {(!isEmpty(urls) || !isEmpty(accessUrls)) && (
                  <Grid.Column width={5}>
                    <Segment className="highlighted">
                      <SeriesUrls truncate />
                    </Segment>
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </div>
        </Responsive>
        <Responsive {...Responsive.onlyMobile}>
          <SeriesPanelMobile />
        </Responsive>
      </>
    );
  }
}

SeriesPanel.propTypes = {
  isLoading: PropTypes.bool,
  series: PropTypes.object.isRequired,
};