import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, List } from 'semantic-ui-react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import _truncate from 'lodash/truncate';

const AccessUrl = ({ truncate, url }) => {
  const description = url.description || url.value;
  return (
    <a href={url.value}>
      {truncate ? _truncate(description, { length: 35 }) : description}{' '}
      <Icon name={url.open_access ? 'lock open' : 'lock'} />
    </a>
  );
};

const Url = ({ truncate, url }) => {
  const description = url.description || url.value;
  return (
    <a href={url.value}>
      {truncate ? _truncate(description, { length: 35 }) : description}{' '}
    </a>
  );
};

export class SeriesUrls extends React.Component {
  render() {
    const urls = get(this.props, 'metadata.urls', []);
    const accessUrls = get(this.props, 'metadata.access_urls', []);
    if (isEmpty(urls) && isEmpty(accessUrls)) {
      return null;
    }

    return (
      <>
        {!isEmpty(accessUrls) && (
          <>
            <Header as="h3">Access online</Header>
            <List bulleted>
              {accessUrls.map((url, index) => (
                <List.Item key={index}>
                  <AccessUrl truncate={this.props.truncate} url={url} />
                </List.Item>
              ))}
            </List>
          </>
        )}

        {!isEmpty(urls) && (
          <>
            <Header as="h3">Links</Header>
            <List bulleted>
              {urls.map((url, index) => (
                <List.Item key={index}>
                  <Url truncate={this.props.truncate} url={url} />
                </List.Item>
              ))}
            </List>
          </>
        )}
      </>
    );
  }
}

SeriesUrls.propTypes = {
  metadata: PropTypes.object,
  truncate: PropTypes.bool,
};
