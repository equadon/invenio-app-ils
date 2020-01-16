import { List } from 'semantic-ui-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SeriesAuthors extends Component {
  render() {
    const { metadata, prefix, delimiter } = this.props;
    return (
      <div className="document-authors-list-wrapper">
        {prefix ? prefix + ' ' : null}
        {metadata && metadata.authors ? (
          <List horizontal className={'document-authors-list'}>
            {metadata.authors.map((author, index) => (
              <List.Item
                as={this.props.listItemAs ? this.props.listItemAs : ''}
                key={`Key${index}`}
              >
                {author}
                {index !== metadata.authors.length - 1 ? delimiter : null}
              </List.Item>
            ))}
          </List>
        ) : null}
      </div>
    );
  }
}

SeriesAuthors.propTypes = {
  metadata: PropTypes.object,
  prefix: PropTypes.string,
  listItemAs: PropTypes.string,
  delimiter: PropTypes.string.isRequired,
};

SeriesAuthors.defaultProps = {
  delimiter: '; ',
};
