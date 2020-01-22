import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Table } from 'semantic-ui-react';
import {
  ReactSearchKit,
  InvenioSearchApi,
  // InvenioRequestSerializer,
  ResultsList,
  SearchBar,
} from 'react-searchkit';
import { literature as literatureApi } from '@api';
import history from '@history';
import Qs from 'qs';
import _extend from 'lodash/extend';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { recordToPidType } from '@api/utils';
import { SearchFooter } from '@components/SearchControls';
import { Link } from 'react-router-dom';
import { FrontSiteRoutes } from '@routes/urls';

const LiteratureSearchBar = (_, executeSearch, onInputChange, queryString) => {
  return (
    <SearchBar
      currentQueryString={queryString}
      onInputChange={onInputChange}
      executeSearch={executeSearch}
      placeholder="Search for volumes or issues in this series..."
    />
  );
};

export class InvenioRequestSerializer {
  constructor() {
    this.serialize = this.serialize.bind(this);
  }

  _addFilter = (filter, filterUrlParams) => {
    if (!Array.isArray(filter)) {
      throw new Error(
        `Filter value "${filter}" in query state must be an array.`
      );
    }
    if (!(filter.length === 2 || filter.length === 3)) {
      throw new Error(
        `Filter value "${filter}" in query state must be an array of 2 or 3 elements`
      );
    }
    const aggName = filter[0];
    const fieldValue = filter[1];
    filterUrlParams[aggName] = fieldValue;
    const hasChild = filter.length === 3;
    if (hasChild) {
      this._addFilter(filter[2], filterUrlParams);
    }
  };

  _addFilters = filters => {
    if (!Array.isArray(filters)) {
      throw new Error(`Filters query state "${filters}" must be an array.`);
    }
    /**
     * input: [
     *   [ 'type_agg', 'value1' ]
     *   [ 'type_agg', 'value2', [ 'subtype_agg', 'a value' ] ]
     * ]
     */
    const filterUrlParams = {};
    filters.forEach(filter => {
      this._addFilter(filter, filterUrlParams);
    });
    /**
     * output: {
     *  type_agg: 'value1'.
     *  subtype_agg: 'a value'
     * }
     */
    return filterUrlParams;
  };

  /**
   * Return a serialized version of the app state `query` for the API backend.
   * @param {object} stateQuery the `query` state to serialize
   */
  serialize(stateQuery) {
    const { queryString, sortBy, sortOrder, page, size, filters } = stateQuery;

    const getParams = {};
    if (queryString !== null) {
      getParams['q'] = queryString;
    }
    if (sortBy !== null) {
      getParams['sort'] = sortBy;

      if (sortOrder !== null) {
        getParams['sort'] = sortOrder === 'desc' ? `-${sortBy}` : sortBy;
      }
    }
    if (page > 0) {
      getParams['page'] = page;
    }
    if (size > 0) {
      getParams['size'] = size;
    }
    const filterParams = this._addFilters(filters);
    _extend(getParams, filterParams);

    return Qs.stringify(getParams, { arrayFormat: 'repeat' });
  }
}

const literatureRequestSerializer = metadata => {
  return class LiteratureRequestSerializerNew extends InvenioRequestSerializer {
    serialize(stateQuery) {
      const relationQuery = `relations.serial.pid:${metadata.pid}`;
      if (isEmpty(stateQuery.queryString)) {
        stateQuery.queryString = relationQuery;
      } else {
        stateQuery.queryString = `${relationQuery} AND (${stateQuery.queryString})`;
      }
      const query = `${super.serialize(stateQuery)}&include_all`;
      console.log('serialize', stateQuery, query);
      return query;
    }
  };
};

const formatVolume = (result, parentPid) => {
  const serials = get(result, 'metadata.relations.serial', []);
  const parent = serials.find(
    relation => relation.pid === parentPid && relation.pid_type === 'serid'
  );
  return parent ? parent.volume : '?';
};

const literatureResults = metadata => results => {
  return (
    <Table basic>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Volume</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Document Type / MOI</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {results.map(result => (
          <Table.Row key={result.metadata.pid}>
            <Table.Cell>{formatVolume(result, metadata.pid)}</Table.Cell>
            <Table.Cell>
              <Link
                to={FrontSiteRoutes.documentDetailsFor(result.metadata.pid)}
              >
                {result.metadata.title}
              </Link>
            </Table.Cell>
            <Table.Cell>
              {recordToPidType(result) === 'docid' ? 'Document' : 'Series'}
            </Table.Cell>
            <Table.Cell>
              {result.metadata.document_type ||
                result.metadata.mode_of_issuance}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export class SeriesLiterature extends Component {
  get searchApi() {
    return new InvenioSearchApi({
      invenio: {
        requestSerializer: literatureRequestSerializer(this.props.metadata),
      },
      url: literatureApi.searchBaseURL,
      withCredentials: true,
    });
  }

  render() {
    const { metadata } = this.props;
    return (
      <>
        <Divider horizontal>Literature in this series</Divider>
        <ReactSearchKit searchApi={this.searchApi} history={history}>
          <SearchBar renderElement={LiteratureSearchBar} />
          <ResultsList renderElement={literatureResults(metadata)} />
          <SearchFooter />
        </ReactSearchKit>
      </>
    );
  }
}

SeriesLiterature.propTypes = {
  metadata: PropTypes.object.isRequired,
};
