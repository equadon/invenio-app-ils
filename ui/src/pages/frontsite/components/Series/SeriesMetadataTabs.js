import React, { Component } from 'react';
import { Divider, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  SeriesAccessUrls,
  SeriesAllTitles,
  SeriesInfo,
  SeriesUrls,
  SeriesIdentifiers,
} from './';
import isEmpty from 'lodash/isEmpty';
import { EmptyMessage } from '@components';

export class SeriesMetadataTabs extends Component {
  renderTabPanes = () => {
    const { metadata } = this.props;
    const panes = [
      {
        menuItem: 'Details',
        render: () => (
          <Tab.Pane attached={false}>
            <SeriesInfo />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Identifiers',
        render: () => (
          <Tab.Pane attached={false}>
            <EmptyMessage
              show={!isEmpty(metadata.identifiers)}
              message="There are no identifiers for this series."
            >
              <SeriesIdentifiers />
            </EmptyMessage>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Titles',
        render: () => (
          <Tab.Pane attached={false}>
            <SeriesAllTitles />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notes',
        render: () => (
          <Tab.Pane attached={false}>
            <EmptyMessage
              show={!isEmpty(metadata.note)}
              message="The library did not leave a note for this series."
            >
              <Divider horizontal>Librarian's note</Divider>
              {metadata.note}
            </EmptyMessage>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Links',
        render: () => (
          <Tab.Pane attached={false}>
            <EmptyMessage
              show={!(isEmpty(metadata.access_urls) && isEmpty(metadata.urls))}
              message="There are no links for this series."
            >
              <Divider horizontal>Access online</Divider>
              <SeriesAccessUrls />
              <Divider horizontal>Links</Divider>
              <SeriesUrls />
            </EmptyMessage>
          </Tab.Pane>
        ),
      },
    ];

    return panes;
  };

  render() {
    return (
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={this.renderTabPanes()}
        id="series-metadata-tabs"
      />
    );
  }
}

SeriesMetadataTabs.propTypes = {
  activeTab: PropTypes.number,
  metadata: PropTypes.object.isRequired,
};
