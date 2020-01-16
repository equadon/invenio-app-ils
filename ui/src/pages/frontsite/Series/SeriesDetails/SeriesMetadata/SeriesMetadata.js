import React, { Component } from 'react';
import { Container, Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  // SeriesMetadataAccordion,
  SeriesMetadataTabs,
  // SeriesStats,
} from '@pages/frontsite/components/Series';

export default class SeriesMetadata extends Component {
  render() {
    const { series } = this.props;
    return (
      <Container className="series-metadata" data-test={series.metadata.pid}>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <SeriesMetadataTabs />
        </Responsive>
        {/* <Responsive {...Responsive.onlyMobile}>
          <SeriesMetadataAccordion />
        </Responsive>
        <Container textAlign={'center'}>
          <SeriesStats series={this.series} />
        </Container> */}
      </Container>
    );
  }
}

SeriesMetadata.propTypes = {
  series: PropTypes.object.isRequired,
};
