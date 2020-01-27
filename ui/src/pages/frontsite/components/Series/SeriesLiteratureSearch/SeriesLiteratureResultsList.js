import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import { recordToPidType } from '@api/utils';
import { DocumentListEntry } from '@pages/frontsite/Documents/DocumentsSearch/DocumentListEntry';
import { SeriesListEntry } from '@pages/frontsite/Documents/DocumentsSearch/SeriesListEntry';
import { findVolume } from '..';

export const SeriesLiteratureResultsList = ({ metadata, results }) => {
  return (
    <Item.Group>
      {results.map(result => {
        const parentPid = {
          value: metadata.pid,
          pid_type: 'serid',
        };
        return recordToPidType(result) === 'docid' ? (
          <DocumentListEntry
            key={result.metadata.pid}
            data-test={result.metadata.pid}
            metadata={result.metadata}
            volume={findVolume(result, parentPid)}
          />
        ) : (
          <SeriesListEntry
            key={result.metadata.pid}
            data-test={result.metadata.pid}
            metadata={result.metadata}
            volume={findVolume(result, parentPid)}
          />
        );
      })}
    </Item.Group>
  );
};

SeriesLiteratureResultsList.propTypes = {
  metadata: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
};
