import React, { Component } from 'react';
import { Accordion, Divider, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import { SeriesRelations, SeriesInfo } from './index';
// import { SeriesTableOfContent } from './SeriesTableOfContent';
// import { SeriesConference } from './SeriesConference';

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
        {/* <Accordion.Title
          active={activeIndex === 'details'}
          index={'details'}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Details
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'details'}>
          <SeriesRelations
            relations={this.metadata.relations}
            seriesType={this.metadata.series_type}
          />
          <SeriesInfo metadata={this.metadata} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'content'}
          index={'content'}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Content
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'content'}>
          <SeriesTableOfContent
            toc={this.metadata.table_of_content}
            abstract={this.metadata.abstract}
          />
          <SeriesInfo metadata={this.metadata} />
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'publications'}
          index={'publications'}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Publications
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'publications'}>
          TODO
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 'conference'}
          index={'conference'}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Conference
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'conference'}>
          <SeriesConference
            conference={this.metadata.conference_info}
            seriesType={this.metadata.series_type}
          />
        </Accordion.Content> */}

        <Accordion.Title
          active={activeIndex === 'notes'}
          index={'notes'}
          onClick={this.handleClick}
        >
          <Icon name="dropdown" />
          Notes
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 'notes'}>
          <Divider horizontal>Librarian's note</Divider>
          {metadata.note}
        </Accordion.Content>
      </Accordion>
    );
  }
}

SeriesMetadataAccordion.propTypes = {
  metadata: PropTypes.object.isRequired,
};
