import React, { Component } from 'react';
import { Accordion, Divider, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SeriesInfo, SeriesUrls, SeriesContent } from './';

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
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'content'}
          index="content"
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Content
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'content'}>
          <SeriesContent />
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
          <SeriesUrls />
        </Accordion.Content>
      </Accordion>
    );
  }
}

SeriesMetadataAccordion.propTypes = {
  metadata: PropTypes.object.isRequired,
};
