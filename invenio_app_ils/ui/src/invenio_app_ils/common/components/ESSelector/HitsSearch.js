import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { serializeHit } from './serializer';

const initialState = {
  isLoading: false,
  results: [],
  selection: null,
  value: '',
};

const ResultRenderer = ({ title, description, extra }) => (
  <div key="content" className="content">
    {extra && <div className="price">{extra}</div>}
    {title && <div className="title">{title}</div>}
    {description && <div className="description">{description}</div>}
  </div>
);

export class HitsSearch extends Component {
  state = initialState;

  clear = () => this.setState(initialState);

  onSelectResult = (event, { result }) => {
    if (this.props.onSelect) {
      this.props.onSelect(result);
    }
    if (this.props.clearOnSelect) {
      this.setState(initialState);
    } else {
      this.setState({ selection: result, value: result.title });
    }
  };

  onSearchChange = async (event, { value }) => {
    this.setState({ isLoading: true, value });

    const { query } = this.props;
    const response = await query(value);
    const results = [];
    for (let hit of response.data.hits) {
      results.push(serializeHit(hit));
    }

    this.setState({
      isLoading: false,
      results: results,
    });
  };

  render() {
    const { isLoading, results, value } = this.state;
    return (
      <Search
        fluid
        loading={isLoading}
        onResultSelect={this.onSelectResult}
        onSearchChange={this.onSearchChange}
        results={results}
        value={value}
        resultRenderer={ResultRenderer}
      />
    );
  }
}
