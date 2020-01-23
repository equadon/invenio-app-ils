import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import { recordToPidType } from '@api/utils';
import { DocumentListEntry } from '@pages/frontsite/Documents/DocumentsSearch/DocumentListEntry';
import { SeriesListEntry } from '@pages/frontsite/Documents/DocumentsSearch/SeriesListEntry';
import get from 'lodash/get';

const formatVolume = (result, parentPid) => {
  const serials = get(result, 'metadata.relations.serial', []);
  const parent = serials.find(
    relation => relation.pid === parentPid && relation.pid_type === 'serid'
  );
  return parent ? parent.volume : '?';
};

export const LiteratureResultsList = ({ metadata, results }) => {
  console.log('metadata', metadata);
  return (
    <Item.Group>
      {results.map(result => {
        console.log('result', result);
        return recordToPidType(result) === 'docid' ? (
          <DocumentListEntry
            key={result.metadata.pid}
            data-test={result.metadata.pid}
            metadata={result.metadata}
            volume={formatVolume(result, metadata.pid)}
          />
        ) : (
          <SeriesListEntry
            key={result.metadata.pid}
            data-test={result.metadata.pid}
            metadata={result.metadata}
          />
        );
      })}
    </Item.Group>
  );
};
