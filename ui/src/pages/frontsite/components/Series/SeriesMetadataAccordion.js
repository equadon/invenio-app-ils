import React, { Component } from 'react';
import { Accordion, Divider, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  SeriesAccessUrls,
  SeriesAllTitles,
  SeriesInfo,
  SeriesUrls,
  SeriesAlternativeTitles,
  SeriesIdentifiers,
} from './';

export class SeriesMetadataAccordion extends Component {
  state = { activeIndex: 'details' };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? '' : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { metadata } = this.props;
    const { activeIndex } = this.state;
    return (
      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 'details'}
          index="details"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'details'}>
          <SeriesInfo metadata={metadata} />
          <SeriesAlternativeTitles metadata={metadata} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'identifiers'}
          index="identifiers"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Identifiers
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'identifiers'}>
          <SeriesIdentifiers />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'titles'}
          index="titles"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Titles
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'titles'}>
          <SeriesAllTitles />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'notes'}
          index="notes"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Notes
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'notes'}>
          <Divider horizontal>Librarian's note</Divider>
          {metadata.note}
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'links'}
          index="links"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Links
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'links'}>
          <Divider horizontal>Access online</Divider>
          <SeriesAccessUrls truncate />
          <Divider horizontal>Links</Divider>
          <SeriesUrls truncate />
        </Accordion.Content>
      </Accordion>
    );
  }
}

SeriesMetadataAccordion.propTypes = {
  metadata: PropTypes.object.isRequired,
};
