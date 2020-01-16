import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

export const SeriesImage = ({ metadata }) => {
  return <Icon name="list" size="huge" color="grey" />;
};

SeriesImage.propTypes = {
  metadata: PropTypes.object.isRequired,
};
