import React, { Component } from 'react';
import { Grid, Item, List, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FrontSiteRoutes } from '@routes/urls';
import { getCover } from '../../../config';
import Truncate from 'react-truncate';
import { SeriesAuthors } from '@components';
import { SeriesImage } from '@pages/frontsite/components/Series';
// import { SeriesLanguages } from '@components/Series';
// import { SeriesAuthors } from '@components/Series';

export default class SeriesListEntry extends Component {
  constructor(props) {
    super(props);
    this.metadata = props.metadata;
  }

  render() {
    return (
      <Item>
        <SeriesImage metadata={this.metadata} />
        <Item.Content>
          <Item.Meta>{this.metadata.series_type}</Item.Meta>
          <Item.Header
            as={Link}
            to={FrontSiteRoutes.seriesDetailsFor(this.metadata.pid)}
          >
            {this.metadata.title}
          </Item.Header>
          <Item.Meta>
            <SeriesAuthors metadata={this.metadata} prefix={'by '} />
          </Item.Meta>
          <Item.Description>
            <Truncate lines={3}>{this.metadata.abstract}</Truncate>
          </Item.Description>
          <Item.Meta>
            <Grid>
              <Grid.Column width={4}>
                <List>
                  <List.Item>
                    <List.Content>
                      <span>Mode of issuance: </span>
                      {this.metadata.mode_of_issuance}
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid>
          </Item.Meta>
        </Item.Content>
      </Item>
    );
  }
}

SeriesListEntry.propTypes = {
  metadata: PropTypes.object.isRequired,
};
