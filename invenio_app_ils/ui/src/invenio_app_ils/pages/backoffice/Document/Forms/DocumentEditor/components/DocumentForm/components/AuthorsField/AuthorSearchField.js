import React from 'react';
import PropTypes from 'prop-types';
import { Search, Form } from 'semantic-ui-react';
import debounce from 'lodash/debounce';
import escapeRegExp from 'lodash/escapeRegExp';

export class AuthorSearchField extends React.Component {
  initialState = {
    isLoading: false,
    value: '',
    results: [],
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;

    // Optimization - prepare search results once
    this.preparedAuthors = props.authors.map((author, index) => ({
      key: author.full_name,
      index: index,
      title: author.full_name,
      description: author.type,
    }));
  }

  search = debounce(async query => {
    if (query.length < 1) {
      this.setState({ results: [] });
      return null;
    }

    const reTitle = new RegExp(escapeRegExp(query), 'i');
    const isMatch = result => reTitle.test(result.title);

    this.setState({
      isLoading: false,
      results: this.preparedAuthors.filter(isMatch),
    });
  }, 300);

  onResultSelect = (e, { result }) => {
    if (this.props.onResultSelect) {
      this.props.onResultSelect(result);
    }
  };

  onSearchChange = (e, { value }) => {
    this.setState({ isLoading: false, value: value });
    if (this.props.onSearchChange) {
      this.props.onSearchChange(value);
    }
    this.search(value);
  };

  render() {
    return (
      <Form.Field>
        <label>Authors</label>
        <Search
          fluid
          input={{ icon: 'search', iconPosition: 'left' }}
          loading={this.state.isLoading}
          minCharacters={1}
          results={this.state.results}
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
