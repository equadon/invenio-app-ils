import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Loader, Item } from 'semantic-ui-react';
import {
  ReactSearchKit,
  InvenioSearchApi,
  ResultsList,
  SearchBar,
  Error,
  ResultsLoader,
} from 'react-searchkit';
import { literature as literatureApi } from '@api';
import history from '@history';
import Qs from 'qs';
import _extend from 'lodash/extend';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { recordToPidType } from '@api/utils';
import {
  SearchFooter,
  SearchEmptyResults,
  SearchControls,
} from '@components/SearchControls';
import { Link } from 'react-router-dom';
import { FrontSiteRoutes } from '@routes/urls';
import {
  Error as IlsError,
  SearchBar as LiteratureSearchBar,
} from '@components';
import { DocumentListEntry } from '@pages/frontsite/Documents/DocumentsSearch/DocumentListEntry';
import { SeriesListEntry } from '@pages/frontsite/Documents/DocumentsSearch/SeriesListEntry';

/**
 * TODO: Document this temporary class and why it's here!!
 */
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
  return class LiteratureRequestSerializer extends InvenioRequestSerializer {
    serialize(stateQuery) {
      const relationQuery = `relations.serial.pid:${metadata.pid}`;
      if (isEmpty(stateQuery.queryString)) {
        stateQuery.queryString = relationQuery;
      } else {
        stateQuery.queryString = `${relationQuery} AND (${stateQuery.queryString})`;
      }
      const query = `${super.serialize(stateQuery)}&include_all`;
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

const LiteratureResultsList = ({ metadata, results }) => {
  return (
    <Item.Group>
      {results.map(result => {
        return recordToPidType(result) === 'docid' ? (
          <DocumentListEntry
            key={result.metadata.pid}
            data-test={result.metadata.pid}
            metadata={result.metadata}
          />
        ) : (
          <SeriesListEntry
            key={result.metadata.pid}
            data-test={result.metadata.pid}
            metadata={result.metadata}
          />
        );
      })}
    </Item.Group>
  );
};

export class SeriesLiterature extends Component {
  renderSearchBar = (_, queryString, onInputChange, executeSearch) => {
    return (
      <LiteratureSearchBar
        currentQueryString={queryString}
        onInputChange={onInputChange}
        executeSearch={executeSearch}
        placeholder={`Search for literature...`}
      />
    );
  };

  renderLoader = () => {
    return (
      <Loader active size="huge" inline="centered" className="full-height" />
    );
  };

  render() {
    const { metadata } = this.props;
    const api = new InvenioSearchApi({
      invenio: {
        requestSerializer: literatureRequestSerializer(metadata),
      },
      url: literatureApi.searchBaseURL,
      withCredentials: true,
    });
    return (
      <>
        <Divider horizontal>Literature in this series</Divider>
        <ReactSearchKit searchApi={api} history={history}>
          <SearchBar renderElement={this.renderSearchBar} />
          <ResultsLoader renderElement={this.renderLoader}>
            <SearchEmptyResults />

            <Error renderElement={this.renderError} />

            <SearchControls
              layoutToggle={this.renderResultsLayoutOptions}
              modelName="literature"
            />
            <ResultsList
              renderElement={results => (
                <LiteratureResultsList metadata={metadata} results={results} />
              )}
            />
            <SearchFooter />
          </ResultsLoader>
        </ReactSearchKit>
      </>
    );
  }
}

SeriesLiterature.propTypes = {
  metadata: PropTypes.object.isRequired,
};
