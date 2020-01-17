import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Item, Table } from 'semantic-ui-react';
import {
  ReactSearchKit,
  InvenioSearchApi,
  ResultsList,
  SearchBar,
} from 'react-searchkit';
import { document as documentApi } from '@api';
import history from '@history';

const SerialSearchBar = (_, executeSearch, onInputChange, queryString) => {
  return (
    <SearchBar
      currentQueryString={queryString}
      onInputChange={onInputChange}
      executeSearch={executeSearch}
      placeholder="Search periodical issues..."
    />
  );
};

const MultipartSearchBar = (_, executeSearch, onInputChange, queryString) => {
  return (
    <SearchBar
      currentQueryString={queryString}
      onInputChange={onInputChange}
      executeSearch={executeSearch}
      placeholder="Search books and series..."
    />
  );
};

const SerialChildrenList = results => {
  return (
    results && (
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PID</Table.HeaderCell>
            <Table.HeaderCell>Schema</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Document Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {results.map(result => (
            <Table.Row key={result.metadata.pid}>
              <Table.Cell>{result.metadata.pid}</Table.Cell>
              <Table.Cell>{result.metadata.$schema}</Table.Cell>
              <Table.Cell>{result.metadata.title}</Table.Cell>
              <Table.Cell>{result.metadata.document_type}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  );
};

const MultipartChildrenList = results => {
  return (
    results && (
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PID</Table.HeaderCell>
            <Table.HeaderCell>Schema</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Document Type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {results.map(result => (
            <Table.Row key={result.metadata.pid}>
              <Table.Cell>{result.metadata.pid}</Table.Cell>
              <Table.Cell>{result.metadata.$schema}</Table.Cell>
              <Table.Cell>{result.metadata.title}</Table.Cell>
              <Table.Cell>{result.metadata.document_type}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  );
};

export class SeriesLiterature extends Component {
  get searchApi() {
    return new InvenioSearchApi({
      url: documentApi.searchBaseURL,
      withCredentials: true,
    });
  }

  render() {
    const { metadata } = this.props;
    const isSerial = metadata.mode_of_issuance === 'SERIAL';
    return (
      <>
        <Divider horizontal>Literature in this series</Divider>
        <ReactSearchKit searchApi={this.searchApi} history={history}>
          <SearchBar
            renderElement={isSerial ? SerialSearchBar : MultipartSearchBar}
          />
          <ResultsList
            renderElement={
              isSerial ? SerialChildrenList : MultipartChildrenList
            }
          />
        </ReactSearchKit>
      </>
    );
  }
}

SeriesLiterature.propTypes = {
  metadata: PropTypes.object.isRequired,
};
