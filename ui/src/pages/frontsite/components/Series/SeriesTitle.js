import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'semantic-ui-react';

export class SeriesTitle extends Component {
  render() {
    const {
      metadata: { title, mode_of_issuance: moi },
    } = this.props;
    return (
      <>
        {moi}
        <Header as="h2">{title}</Header>
      </>
    );
  }
}

SeriesTitle.propTypes = {
  metadata: PropTypes.object.isRequired,
};
