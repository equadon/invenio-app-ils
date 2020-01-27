import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BookCard } from '@pages/frontsite/components/BookCard';

import { Card, Responsive } from 'semantic-ui-react';
import { ResultsGrid } from 'react-searchkit';
import { SeriesCard, findVolume } from '@pages/frontsite/components/Series';
import { recordToPidType } from '@api/utils';

export default class DocumentSearchResultsGrid extends Component {
  renderResultsGrid = results => {
    // TODO: Change to use the pid object's pid_type when it's been implemented
    const cards = results.map(result => {
      const parentPid = {
        value: this.props.metadata.pid,
        pid_type: 'serid',
      };
      const volume = findVolume(result, parentPid);
      return recordToPidType(result) === 'docid' ? (
        <BookCard key={result.metadata.pid} data={result} volume={volume} />
      ) : (
        <SeriesCard key={result.metadata.pid} data={result} volume={volume} />
      );
    });
    return (
      <>
        <Responsive minWidth={Responsive.onlyLargeScreen.minWidth}>
          <Card.Group doubling stackable itemsPerRow={5}>
            {cards}
          </Card.Group>
        </Responsive>
        <Responsive maxWidth={Responsive.onlyLargeScreen.minWidth - 1}>
          <Card.Group doubling stackable itemsPerRow={3}>
            {cards}
          </Card.Group>
        </Responsive>
      </>
    );
  };

  render() {
    return <ResultsGrid renderElement={this.renderResultsGrid} />;
  }
}

DocumentSearchResultsGrid.propTypes = {
  metadata: PropTypes.object.isRequired,
};
