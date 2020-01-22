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
import { EmptyMessage } from '@components';
import isEmpty from 'lodash/isEmpty';

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
          <EmptyMessage
            show={!isEmpty(metadata.identifiers)}
            message="There are no identifiers for this series."
          >
            <SeriesIdentifiers />
          </EmptyMessage>
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
          <EmptyMessage
            show={!isEmpty(metadata.note)}
            message="The library did not leave a note for this series."
          >
            <Divider horizontal>Librarian's note</Divider>
            {metadata.note}
          </EmptyMessage>
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
          <EmptyMessage
            show={!(isEmpty(metadata.access_urls) && isEmpty(metadata.urls))}
            message="There are no links for this series."
          >
            <Divider horizontal>Access online</Divider>
            <SeriesAccessUrls />
            <Divider horizontal>Links</Divider>
            <SeriesUrls />
          </EmptyMessage>
        </Accordion.Content>
      </Accordion>
    );
  }
}

SeriesMetadataAccordion.propTypes = {
  metadata: PropTypes.object.isRequired,
};
