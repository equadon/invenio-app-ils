import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Segment, Container, Header, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import { MetadataTable } from '../../../components/MetadataTable';
import { EditButton } from '../../../components/buttons';
import {
  document as documentApi,
  keyword as keywordApi,
} from '../../../../../common/api';
import { BackOfficeRoutes, openRecordEditor } from '../../../../../routes/urls';
import { ESSelector } from '../../../../../common/components/ESSelector';

export default class DocumentMetadata extends Component {
  _renderKeywords(keywords) {
    return (
      <List horizontal>
        {keywords.map(keyword => (
          <List.Item key={keyword.name}>
            <Link
              to={BackOfficeRoutes.documentsListWithQuery(
                documentApi
                  .query()
                  .withKeyword(keyword)
                  .qs()
              )}
            >
              {keyword.name}
            </Link>
          </List.Item>
        ))}
      </List>
    );
  }

  render() {
    const document = this.props.documentDetails;
    const rows = [
      { name: 'Title', value: document.metadata.title },
      { name: 'Authors', value: document.metadata.authors },
    ];
    if (!_isEmpty(document.metadata.keywords)) {
      rows.push({
        name: 'Keywords',
        value: this._renderKeywords(document.metadata.keywords),
      });
    }
    const header = (
      <Grid.Row>
        <Grid.Column width={14} verticalAlign={'middle'}>
          <Header as="h1">
            Document #{document.document_pid} - {document.metadata.title}
          </Header>
        </Grid.Column>
        <Grid.Column width={2} textAlign={'right'}>
          <EditButton
            clickHandler={() =>
              openRecordEditor(documentApi.url, document.document_pid)
            }
          />
        </Grid.Column>
      </Grid.Row>
    );
    const keywordSelection = document.metadata.keywords.map(keyword => ({
      id: keyword.keyword_pid,
      title: keyword.name,
    }));

    return (
      <Segment className="document-metadata">
        <Grid padded columns={2}>
          {header}
          <Grid.Row>
            <Grid.Column>
              <MetadataTable rows={rows} />
              <ESSelector
                multiple
                selections={keywordSelection}
                query={keywordApi.list}
                title="Select Keywords"
                triggerText="Add keyword"
                onSave={value => console.log('onSave()', value)}
              />
              <ESSelector
                query={documentApi.list}
                title="Select Document"
                triggerText="Select document"
                onSave={value => console.log('onSave()', value)}
              />
            </Grid.Column>
            <Grid.Column>
              <Container>
                <Header as="h3">Abstract</Header>
                <p>{document.metadata.abstracts}</p>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

DocumentMetadata.propTypes = {
  documentDetails: PropTypes.object.isRequired,
};
