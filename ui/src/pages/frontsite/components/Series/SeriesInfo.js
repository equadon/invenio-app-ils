import React from 'react';
import { Divider, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  SeriesAuthors,
  SeriesLanguages,
  SeriesModeOfIssuance,
} from '@components/Series';
import { SeparatedList } from '@components';
import get from 'lodash/get';
import capitalize from 'lodash/capitalize';

export const SeriesIdentifiers = ({ metadata }) => {
  const identifiers = {};
  for (const id of get(metadata, 'identifiers', [])) {
    const value = { value: id.value, material: id.material };
    if (id.scheme in identifiers) {
      identifiers[id.scheme].push(value);
    } else {
      identifiers[id.scheme] = [value];
    }
  }
  return Object.entries(identifiers).map(([scheme, ids]) => {
    const values = ids.map(id => (
      <>
        {id.value}
        {id.material && (
          <>
            {' '}
            (<abbr title="Material">{capitalize(id.material)}</abbr>)
          </>
        )}
      </>
    ));
    return (
      <Table.Row key={scheme}>
        <Table.Cell>{scheme}</Table.Cell>
        <Table.Cell>
          <SeparatedList items={values} />
        </Table.Cell>
      </Table.Row>
    );
  });
};

export const SeriesInfo = ({ metadata }) => {
  return (
    <>
      <Divider horizontal>Details</Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell>{metadata.title}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Authors</Table.Cell>
            <Table.Cell>
              <SeriesAuthors metadata={metadata} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Mode of issuance</Table.Cell>
            <Table.Cell>
              <SeriesModeOfIssuance metadata={metadata} />
            </Table.Cell>
          </Table.Row>
          {metadata.publisher && (
            <Table.Row>
              <Table.Cell>Publisher</Table.Cell>
              <Table.Cell>{metadata.publisher}</Table.Cell>
            </Table.Row>
          )}
          {metadata.edition && (
            <Table.Row>
              <Table.Cell>Edition</Table.Cell>
              <Table.Cell>{metadata.edition}</Table.Cell>
            </Table.Row>
          )}
          {metadata.languages && (
            <Table.Row>
              <Table.Cell>Languages</Table.Cell>
              <Table.Cell>
                <SeriesLanguages metadata={metadata} />
              </Table.Cell>
            </Table.Row>
          )}
          {metadata.identifiers && <SeriesIdentifiers metadata={metadata} />}
        </Table.Body>
      </Table>
    </>
  );
};

SeriesInfo.propTypes = {
  metadata: PropTypes.object.isRequired,
};
