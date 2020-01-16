import React, { Component } from 'react';
import { Grid, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import {
  ILSHeaderPlaceholder,
  ILSParagraphPlaceholder,
} from '@components/ILSPlaceholder';
import {
  SeriesAbstract,
  SeriesTitle,
} from '@pages/frontsite/components/Series';
import { SeriesPanelMobile } from './index';
import { SeriesAuthors } from '@components/Series';

export default class SeriesPanel extends Component {
  render() {
    const { isLoading, series } = this.props;
    return (
      <>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <div
            className="series-panel"
            data-test={series.metadata ? series.metadata.pid : 0}
          >
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <ILSHeaderPlaceholder isLoading={isLoading}>
                    <SeriesTitle />
                  </ILSHeaderPlaceholder>
                  <ILSParagraphPlaceholder
                    linesNumber={1}
                    isLoading={isLoading}
                  >
                    <SeriesAuthors
                      prefix="by "
                      listItemAs="h4"
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
                <Grid.Column>SeriesCirculation</Grid.Column>
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
  series: PropTypes.object.isRequired,
};
