import React, { Component } from 'react';
import { Divider, Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SeriesInfo, SeriesUrls, SeriesAlternativeTitles } from './';

export class SeriesMetadataTabs extends Component {
  renderTabPanes = () => {
    const { metadata } = this.props;
    const panes = [
      {
        menuItem: 'Details',
        render: () => (
          <Tab.Pane attached={false}>
            <SeriesInfo />
            <SeriesAlternativeTitles />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Notes',
        render: () => (
          <Tab.Pane attached={false}>
            <Divider horizontal>Librarian's note</Divider>
            {metadata.note}
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Links',
        render: () => (
          <Tab.Pane attached={false}>
            <SeriesUrls />
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