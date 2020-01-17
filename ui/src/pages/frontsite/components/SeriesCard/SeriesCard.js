import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import { getCover } from '@pages/frontsite/config';
import { SeriesModeOfIssuance } from '@components/Series';

export class SeriesCard extends Component {
  render() {
    const { data } = this.props;
    return (
      <Card
        link
        centered
        className="fs-book-card"
        onClick={() =>
          goTo(FrontSiteRoutes.seriesDetailsFor(data.metadata.pid))
        }
      >
        <Card.Meta className="discrete">
          <SeriesModeOfIssuance metadata={data.metadata} />
        </Card.Meta>
        <Image
          centered
          src={getCover(data.metadata.edition || '0')}
          size="small"
          onError={e => (e.target.style.display = 'none')}
        />
        <Card.Content>
          <Card.Header>{data.metadata.title}</Card.Header>
          <Card.Meta>
            <div>{data.metadata.authors.join(', ')}</div>
            {data.metadata.edition && (
              <div>Edition {data.metadata.edition}</div>
            )}
            {data.metadata.publisher && (
              <div>Publisher {data.metadata.publisher}</div>
            )}
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

SeriesCard.propTypes = {
  data: PropTypes.object.isRequired,
};
