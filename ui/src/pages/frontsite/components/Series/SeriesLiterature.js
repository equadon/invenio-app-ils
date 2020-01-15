import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Divider, Placeholder } from 'semantic-ui-react';

export class SeriesLiterature extends Component {
  render() {
    return (
      <>
        <Divider horizontal>Literature in this series</Divider>
        <Placeholder>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder>
      </>
    );
  }
}

SeriesLiterature.propTypes = {
  metadata: PropTypes.object.isRequired,
};
