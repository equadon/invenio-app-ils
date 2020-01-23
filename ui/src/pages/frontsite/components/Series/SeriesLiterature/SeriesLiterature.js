import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Loader } from 'semantic-ui-react';
import {
  ReactSearchKit,
  InvenioSearchApi,
  ResultsList,
  SearchBar,
  Error,
  ResultsLoader,
} from 'react-searchkit';
import { literatureRequestSerializerCls } from './RequestSerializer';
import { literature as literatureApi } from '@api';
import {
  Error as IlsError,
  SearchBar as LiteratureSearchBar,
} from '@components';
import {
  SearchFooter,
  SearchEmptyResults,
  SearchControls,
} from '@components/SearchControls';
import history from '@history';
import { LiteratureResultsList } from './LiteratureResultsList';

export class SeriesLiterature extends React.Component {
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

  renderError = error => {
    return <IlsError error={error} />;
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
        requestSerializer: literatureRequestSerializerCls(metadata),
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
