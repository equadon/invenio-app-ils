import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import { SeriesImage } from '../Series/SeriesImage';

export class SeriesCard extends Component {
  render() {
    const { data } = this.props;
    const moi = data.metadata.mode_of_issuance;
    return (
      <Card
        link
        centered
        className="fs-book-card"
        onClick={() =>
          goTo(FrontSiteRoutes.seriesDetailsFor(data.metadata.pid))
        }
      >
        <Card.Meta className={'discrete'}>
          {moi}
          <br />
          <SeriesImage metadata={data.metadata} />
        </Card.Meta>
        <Card.Content>
          <Card.Header>{data.metadata.title}</Card.Header>
          <Card.Meta>
            <div>{data.metadata.authors.join(', ')}</div>
            <div>Edition {data.metadata.edition}</div>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

SeriesCard.propTypes = {
  data: PropTypes.object.isRequired,
};
