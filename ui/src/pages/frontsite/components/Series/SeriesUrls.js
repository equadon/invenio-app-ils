import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Icon, List } from 'semantic-ui-react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import truncate from 'lodash/truncate';

const AccessUrl = ({ url }) => {
  return (
    <>
      <a href={url.value}>
        {truncate(url.description || url.value, { length: 40 })}{' '}
        <Icon name={url.open_access ? 'lock open' : 'lock'} />
      </a>
    </>
  );
};

const Url = ({ url }) => {
  return (
    <a href={url.value}>
      {truncate(url.description || url.value, { length: 40 })}
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
                  <AccessUrl url={url} />
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
                  <Url url={url} />
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
};
