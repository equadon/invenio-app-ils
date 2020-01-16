import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Label, Image, Icon } from 'semantic-ui-react';
import get from 'lodash/get';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';

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
          <Icon size="huge" color="grey" name="list" />
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
