import React, { Component } from 'react';
import { Divider, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { SeriesAuthors } from '@components/Series';

export class SeriesInfo extends Component {
  renderLanguages() {
    const { metadata } = this.props;
    if (metadata.languages) {
      return (
        <Table.Row>
          <Table.Cell>Languages</Table.Cell>
          <Table.Cell>{metadata.languages.map(lang => lang + ', ')}</Table.Cell>
        </Table.Row>
      );
    }
    return null;
  }

  render() {
    const { metadata } = this.props;
    return (
      <>
        <Divider horizontal>Details</Divider>
        <Table definition>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Title</Table.Cell>
              <Table.Cell>{metadata.title}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Authors</Table.Cell>
              <Table.Cell>
                <SeriesAuthors metadata={metadata} />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Edition</Table.Cell>
              <Table.Cell>{metadata.edition}</Table.Cell>
            </Table.Row>
            {this.renderLanguages()}
          </Table.Body>
        </Table>
      </>
    );
  }
}

SeriesInfo.propTypes = {
  metadata: PropTypes.object.isRequired,
};
