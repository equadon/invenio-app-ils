import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Label } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { FrontSiteRoutes } from '@routes/urls';
import { goTo } from '@history';
import { DocumentAuthors } from '@components/Document';
import { toShortDate } from '@api/date';
import { getCover } from '../config';

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
          goTo(FrontSiteRoutes.documentDetailsFor(data.metadata.pid))
        }
      >
        <Card.Meta className={'discrete'}>{moi}</Card.Meta>
        <Image
          centered
          src={getCover(data.metadata.edition)}
          size={'small'}
          onError={e => (e.target.style.display = 'none')}
        />
        <Card.Content>
          <Card.Header>{data.metadata.title}</Card.Header>
          <Card.Meta>
            <div>{data.metadata.authors.join(', ')}</div>
            <div>Edition {data.metadata.edition}</div>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Label>
            {moi === 'SERIAL'
              ? `${get(data, 'metadata.relations.serial', []).length} issues`
              : `${
                  get(data, 'metadata.relations.multipart_monograph', []).length
                } volumes`}
          </Label>
        </Card.Content>
      </Card>
    );
  }
}

SeriesCard.propTypes = {
  data: PropTypes.object.isRequired,
};
