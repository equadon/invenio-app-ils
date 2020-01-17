import React from 'react';
import { Divider, Table } from 'semantic-ui-react';
import capitalize from 'lodash/capitalize';

const AlternativeTitle = ({ title }) => {
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

export const SeriesContent = ({ metadata }) => {
  const alternativeTitles = metadata.alternative_titles || [];
  return (
    <>
      <Divider horizontal>Titles</Divider>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell>{metadata.title}</Table.Cell>
          </Table.Row>
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

      <Divider horizontal>Abstract</Divider>
      {metadata.abstract}
    </>
  );
};
