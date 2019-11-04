import React from 'react';
import PropTypes from 'prop-types';
import { Search, Form, Button } from 'semantic-ui-react';
import debounce from 'lodash/debounce';
import escapeRegExp from 'lodash/escapeRegExp';
import { GroupField } from '../../../../../../../../../forms';

export class AuthorSearchField extends React.Component {
  initialState = {
    isLoading: false,
    value: '',
    results: [],
  };
  state = this.initialState;

  search = debounce(async query => {
    if (query.length < 1) {
      this.setState({ isLoading: false, results: [] });
      return null;
    }

    const reTitle = new RegExp(escapeRegExp(query), 'i');
    const isMatch = result => reTitle.test(result);

    this.setState({
      isLoading: false,
      results: this.props.authors.reduce((results, author, index) => {
        if (isMatch(author.full_name)) {
          results.push({
            key: author.full_name,
            index: index,
            title: author.full_name,
            description: author.type,
          });
        }
        return results;
      }, []),
    });
  }, 300);

  onFocus = () => {
    // Trigger a search to update in case an author was modified
    this.onSearchChange(null, { value: this.state.value });
  };

  onResultSelect = (e, { result }) => {
    if (this.props.onResultSelect) {
      this.props.onResultSelect(result);
    }
  };

  onSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value: value, results: [] });
    if (this.props.onSearchChange) {
      this.props.onSearchChange(value);
    }
    this.search(value);
  };

  onNewAuthor = () => {
    if (this.props.onResultSelect) {
      this.props.onResultSelect({
        index: this.props.authors.length,
      });
    }
  };

  render() {
    return (
      <Form.Field>
        <label>Authors</label>
        <Form.Button
          type="button"
          content="New author"
          icon="add"
          onClick={this.onNewAuthor}
        />
        <Search
          fluid
          input={{ icon: 'search', iconPosition: 'left' }}
          loading={this.state.isLoading}
          minCharacters={1}
          results={this.state.results}
          onFocus={this.onFocus}
          onResultSelect={this.onResultSelect}
          onSearchChange={this.onSearchChange}
          value={this.state.value}
        />
      </Form.Field>
    );
  }
}

AuthorSearchField.propTypes = {
  authors: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func,
  onResultSelect: PropTypes.func,
};
