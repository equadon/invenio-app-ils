import React, { Component } from 'react';
import { Grid, Item, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FrontSiteRoutes } from '@routes/urls';
import { getCover } from '../../../config';
import Truncate from 'react-truncate';
import { SeriesAuthors } from '@components';
import { SeriesLanguages, SeriesModeOfIssuance } from '@components/Series';

export default class SeriesListEntry extends Component {
  constructor(props) {
    super(props);
    this.metadata = props.metadata;
  }

  render() {
    return (
      <Item>
        <Item.Image
          src={getCover(this.metadata.edition || '0')}
          size="small"
          floated="left"
          as={Link}
          to={FrontSiteRoutes.seriesDetailsFor(this.metadata.pid)}
        />
        <Item.Content>
          <Item.Meta>
            <SeriesModeOfIssuance metadata={this.metadata} />
          </Item.Meta>
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
                  {this.metadata.edition && (
                    <List.Item>
                      <List.Content>
                        <span>Edition: </span>
                        {this.metadata.edition}
                      </List.Content>
                    </List.Item>
                  )}
                  {this.metadata.publisher && (
                    <List.Item>
                      <List.Content>
                        <span>Publisher: </span>
                        {this.metadata.publisher}
                      </List.Content>
                    </List.Item>
                  )}
                  <List.Item>
                    <List.Content>
                      <span>Languages: </span>
                      <SeriesLanguages metadata={this.metadata} />
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
