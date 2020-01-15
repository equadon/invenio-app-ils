import React from 'react';
import { Divider, Table } from 'semantic-ui-react';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';

export const AlternativeTitle = ({ title }) => {
  const type = capitalize(title.type.replace('_', ' '));
  return (
    <Table.Row>
      <Table.Cell>{type}</Table.Cell>
      <Table.Cell>
        {title.value}
        {title.language && (
          <>
            {' '}
            (<abbr title="Language of the title">{title.language}</abbr>)
          </>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export const SeriesAlternativeTitles = ({ metadata }) => {
  const alternativeTitles = metadata.alternative_titles;
  return (
    !isEmpty(alternativeTitles) && (
      <>
        <Divider horizontal>Alternative titles</Divider>
        <Table definition>
          <Table.Body>
            {metadata.abbreviated_title && (
              <Table.Row>
                <Table.Cell>Abbreviated title</Table.Cell>
                <Table.Cell>{metadata.abbreviated_title}</Table.Cell>
              </Table.Row>
            )}
            {alternativeTitles.map((title, index) => (
              <AlternativeTitle title={title} key={index} />
            ))}
          </Table.Body>
        </Table>
      </>
    )
  );
};
