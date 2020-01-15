import React from 'react';
import PropTypes from 'prop-types';
import { SeparatedList } from '@components/SeparatedList';

export const SeriesAuthors = ({ metadata: { authors }, ...props }) => {
  return (
    <div className="document-authors-list-wrapper">
      <SeparatedList
        items={authors}
        separator="; "
        className="document-authors-list"
        {...props}
      />
    </div>
  );
};

SeriesAuthors.propTypes = {
  metadata: PropTypes.object,
};
